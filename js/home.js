 // DOM elements
 const profileForm = document.getElementById('profileForm');
 const fullNameInput = document.getElementById('fullName');
 const emailInput = document.getElementById('email');
 const roleInput = document.getElementById('role');
 const bioInput = document.getElementById('bio');
 const profilePictureUpload = document.getElementById('profilePictureUpload');
 const profilePicture = document.getElementById('profilePicture');
 const userName = document.getElementById('userName');
 const welcomeName = document.getElementById('welcomeName');
 const userRole = document.getElementById('userRole');
 const logoutBtn = document.getElementById('logoutBtn');
 const recentActivity = document.getElementById('recentActivity');
 const communityUpdates = document.getElementById('communityUpdates');
 const solarProjects = document.getElementById('solarProjects');

 // Load user data
 auth.onAuthStateChanged(user => {
     if (user) {
         db.collection('users').doc(user.uid).onSnapshot(doc => {
             const data = doc.data();
             fullNameInput.value = data.fullName || 'John Doe';
             emailInput.value = data.email || '';
             roleInput.value = data.role || '';
             bioInput.value = data.bio || '';
             userName.textContent = data.fullName || 'User';
             welcomeName.textContent = data.fullName || 'User';
             userRole.textContent = data.role || 'Member';
             profilePicture.src = data.profilePicture || '/img/user.png';
             loadRecentActivity(user.uid);
             loadCommunityUpdates();
             loadSolarProjects(user.uid);
             initSolarActivityChart();
             initEnergySavingsChart();
         });
     } else {
         // Redirect to login page if not authenticated
         window.location.href = 'login.html';
     }
 });

 // Update profile
 profileForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     const user = auth.currentUser;
     if (user) {
         try {
             await db.collection('users').doc(user.uid).update({
                 fullName: fullNameInput.value,
                 email: emailInput.value,
                 role: roleInput.value,
                 bio: bioInput.value
             });
             showNotification('Profile updated successfully!', 'success');
         } catch (error) {
             console.error('Error updating profile:', error);
             showNotification('An error occurred while updating your profile.', 'error');
         }
     }
 });

 // Upload profile picture
 profilePictureUpload.addEventListener('change', async (e) => {
     const file = e.target.files[0];
     const user = auth.currentUser;
     if (file && user) {
         try {
             const storageRef = storage.ref(`profilePictures/${user.uid}`);
             await storageRef.put(file);
             const url = await storageRef.getDownloadURL();
             await db.collection('users').doc(user.uid).update({
                 profilePicture: url
             });
             profilePicture.src = url;
             showNotification('Profile picture updated successfully!', 'success');
         } catch (error) {
             console.error('Error uploading profile picture:', error);
             showNotification('An error occurred while uploading your profile picture.', 'error');
         }
     }
 });

 // Logout
 logoutBtn.addEventListener('click', () => {
     auth.signOut().then(() => {
         window.location.href = 'login.html';
     }).catch((error) => {
         console.error('Error signing out:', error);
         showNotification('An error occurred while signing out.', 'error');
     });
 });


  // Mobile navigation handling
  const mobileNavItems = document.querySelectorAll('#mobileNav a');
  const mainContent = document.querySelector('main');

  mobileNavItems.forEach(item => {
      item.addEventListener('click', (e) => {
          e.preventDefault();
          mobileNavItems.forEach(navItem => navItem.classList.remove('mobile-nav-active'));
          item.classList.add('mobile-nav-active');
          
          const page = item.getAttribute('data-page');
          loadPage(page);
      });
  });

  function loadPage(page) {
      // Here you would typically load the content for each page
      // For this example, we'll just update the main content with a placeholder
      let content = '';
      switch(page) {
          case 'dashboard':
              content = '<h1 class="text-2xl font-bold mb-4">Dashboard</h1><p>Welcome to your dashboard!</p>';
              break;
          case 'profile':
              content = '<h1 class="text-2xl font-bold mb-4">Profile</h1><p>This is your profile page.</p>';
              break;
          case 'projects':
              content = '<h1 class="text-2xl font-bold mb-4">Solar Projects</h1><p>View your solar projects here.</p>';
              break;
          case 'community':
              content = '<h1 class="text-2xl font-bold mb-4">Community</h1><p>Connect with your community!</p>';
              break;
          default:
              content = '<h1 class="text-2xl font-bold mb-4">Page Not Found</h1><p>The requested page could not be found.</p>';
      }
      mainContent.innerHTML = content;
  }

  // Initialize the dashboard as the active page on load
  document.addEventListener('DOMContentLoaded', () => {
      const dashboardLink = document.querySelector('[data-page="dashboard"]');
      dashboardLink.classList.add('mobile-nav-active');
      loadPage('dashboard');
  });
