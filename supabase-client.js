/* ==========================================================================
   FASHOW — Supabase Client & Backend Interface
   Manages Real Auth, Database Sync, and Storage
   ========================================================================== */

(function () {
  'use strict';

  // Default configuration placeholders (can be configured in code or in UI)
  const STORAGE_KEY_URL = 'fashow_supabase_url';
  const STORAGE_KEY_ANON = 'fashow_supabase_anon';

  let client = null;
  let currentSession = null;
  let currentProfile = null;

  function getStoredCredentials() {
    const url = localStorage.getItem(STORAGE_KEY_URL) || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || '';
    const anonKey = localStorage.getItem(STORAGE_KEY_ANON) || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || '';
    return { url: url.trim(), anonKey: anonKey.trim() };
  }

  function setStoredCredentials(url, anonKey) {
    if (url && anonKey) {
      localStorage.setItem(STORAGE_KEY_URL, url.trim());
      localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
      return initClient();
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_ANON);
      client = null;
      return false;
    }
  }

  function initClient() {
    const { url, anonKey } = getStoredCredentials();
    if (!url || !anonKey) {
      client = null;
      return false;
    }

    try {
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        client = window.supabase.createClient(url, anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        });
        return true;
      }
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
    }
    return false;
  }

  function isConfigured() {
    return client !== null;
  }

  // --- Auth Methods ---
  async function signUp(email, password, metadata = {}) {
    if (!client) throw new Error('Supabase is not configured yet.');
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    if (error) throw error;
    return data;
  }

  async function signIn(email, password) {
    if (!client) throw new Error('Supabase is not configured yet.');
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    currentSession = data.session;
    return data;
  }

  async function signOut() {
    if (!client) return;
    const { error } = await client.auth.signOut();
    currentSession = null;
    currentProfile = null;
    if (error) console.error('Sign out error:', error);
  }

  async function getSession() {
    if (!client) return null;
    const { data } = await client.auth.getSession();
    currentSession = data.session;
    return currentSession;
  }

  async function getProfile(userId) {
    if (!client || !userId) return null;
    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) {
        currentProfile = data;
        return data;
      }
    } catch (err) {
      console.warn('Could not fetch user profile:', err);
    }
    return null;
  }

  // --- Database Methods ---
  async function fetchOpportunities() {
    if (!client) return null;
    const { data, error } = await client
      .from('opportunities')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async function insertOpportunity(oppData) {
    if (!client) throw new Error('Supabase not connected');
    const user = currentSession ? currentSession.user : null;
    if (!user) throw new Error('Must be logged in to post an opportunity');

    const payload = {
      company_id: user.id,
      company_name: oppData.company_name || 'My Fashion Atelier',
      title: oppData.title,
      type: oppData.type,
      term: oppData.term,
      category: oppData.category,
      location: oppData.location,
      compensation: oppData.compensation,
      deadline: oppData.deadline,
      description: oppData.description,
      responsibilities: oppData.responsibilities || [],
      requirements: oppData.requirements || [],
      tags: oppData.tags || []
    };

    const { data, error } = await client
      .from('opportunities')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function submitApplication(appData) {
    if (!client) throw new Error('Supabase not connected');
    const user = currentSession ? currentSession.user : null;
    if (!user) throw new Error('Please sign in or create an account to submit an application');

    const payload = {
      opportunity_id: appData.opportunity_id,
      student_id: user.id,
      portfolio_link: appData.portfolio_link,
      resume_url: appData.resume_url || 'resume_on_file.pdf',
      pitch: appData.pitch,
      status: 'Submitted',
      note: 'Application received by brand creative team.'
    };

    const { data, error } = await client
      .from('applications')
      .insert([payload])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async function fetchMyApplications() {
    if (!client) return null;
    const user = currentSession ? currentSession.user : null;
    if (!user) return [];

    const { data, error } = await client
      .from('applications')
      .select(`
        id,
        status,
        note,
        created_at,
        portfolio_link,
        pitch,
        opportunities (
          id,
          title,
          company_name,
          location,
          type,
          compensation
        )
      `)
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async function fetchEmployerApplications() {
    if (!client) return null;
    const user = currentSession ? currentSession.user : null;
    if (!user) return [];

    const { data, error } = await client
      .from('applications')
      .select(`
        id,
        status,
        note,
        created_at,
        portfolio_link,
        pitch,
        student_id,
        opportunities!inner (
          id,
          title,
          company_id
        ),
        profiles:student_id (
          id,
          full_name,
          school,
          major,
          grad_year,
          email
        )
      `)
      .eq('opportunities.company_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async function updateApplicationStatus(applicationId, newStatus, note = '') {
    if (!client) throw new Error('Supabase not connected');
    const { data, error } = await client
      .from('applications')
      .update({
        status: newStatus,
        note: note || `Status updated to ${newStatus}`,
        updated_at: new Date().toISOString()
      })
      .eq('id', applicationId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Auto-init on load if script is present
  document.addEventListener('DOMContentLoaded', () => {
    initClient();
  });

  // Export API
  window.FashowBackend = {
    initClient,
    isConfigured,
    getStoredCredentials,
    setStoredCredentials,
    signUp,
    signIn,
    signOut,
    getSession,
    getProfile,
    fetchOpportunities,
    insertOpportunity,
    submitApplication,
    fetchMyApplications,
    fetchEmployerApplications,
    updateApplicationStatus,
    getClient: () => client
  };

})();
