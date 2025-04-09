// Ainembabazi Prossy
//23/U/BIT/0251/KDAY

// Home Section Starts
var menuBtn = document.querySelector('.main-navbar .menu-btn');
var menuList = document.querySelector('.main-navbar .nav-list');
var menuListItems = document.querySelectorAll('.nav-list li a');

menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active');
	menuList.classList.toggle('active');
});

for(var i = 0; i < menuListItems.length; i++){
	menuListItems[i].addEventListener('click', menuItemClicked);
}
function menuItemClicked(){
	menuBtn.classList.remove('active');
	menuList.classList.remove('active');
}

var homeSection = document.querySelector('.home');
window.addEventListener('scroll', pageScrollFunction);
window.addEventListener('load', pageScrollFunction);

function pageScrollFunction(){
	if(window.scrollY > 120){
		homeSection.classList.add('active');
	}
	else{
		homeSection.classList.remove('active');
	}
}
// Home Section Ends

// Partners Section Starts 
$('.partners-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        700:{
            items:3
        },
        1000:{
        	items:5
        }
    }
})
// Partners Section Ends 

// Testimonials Section Starts
$('.testimonials-slider').owlCarousel({
    loop:true,
    autoplay:true,
    autoplayTimeout:6000,
    margin:10,
    nav:true,
    navText:["<i class='fa-solid fa-arrow-left'></i>",
             "<i class='fa-solid fa-arrow-right'></i>"],
    responsive:{
        0:{
            items:1
        },
        768:{
            items:2
        }
    }
})
// Testimonials Section Ends

document.addEventListener('DOMContentLoaded', function() {
    // Course data array (you can expand this with more courses if needed)
    const courses = [
        {
            id: 'uiux-design',
            title: 'UI/UX Design Fundamentals',
            category: 'Design',
            price: 2500000,
            duration: '8 Weeks'
        },
        {
            id: 'data-science',
            title: 'Data Science & Analytics',
            category: 'Data Science',
            price: 1300000,
            duration: '12 Weeks'
        },
        {
            id: 'cloud-computing',
            title: 'Cloud Computing Essentials',
            category: 'Development',
            price: 1500000,
            duration: '10 Weeks'
        },
        {
            id: 'devops-engineering',
            title: 'DevOps Engineering',
            category: 'Development',
            price: 2300000,
            duration: '14 Weeks'
        },
        {
            id: 'ai-machine-learning',
            title: 'AI & Machine Learning',
            category: 'Development',
            price: 1700000,
            duration: '16 Weeks'
        },
        {
            id: 'cybersecurity',
            title: 'Cybersecurity Fundamentals',
            category: 'Security',
            price: 700000,
            duration: '8 Weeks'
        }
    ];
    
    // DOM Elements
    const courseContainer = document.getElementById('course-container');
    const courseSearchInput = document.getElementById('course-search');
    const mainSearchInput = document.getElementById('main-search-input');
    const mainSearchForm = document.getElementById('main-search-form');
    const categoryFilter = document.getElementById('course-category-filter');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const enrollmentModal = document.getElementById('enrollment-modal');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeSuccessModalBtn = document.querySelector('.close-success-modal');
    const okBtn = document.querySelector('.ok-btn');
    const enrollmentForm = document.getElementById('enrollment-form');
    const selectedCourseTitle = document.getElementById('selected-course-title');
    const courseIdInput = document.getElementById('course-id');
    const startDateSpan = document.getElementById('start-date');
    
    // Initialize menu button functionality if it exists
    if (document.querySelector('.menu-btn')) {
        document.querySelector('.menu-btn').addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.nav-list').classList.toggle('active');
        });
    }
    
    // Function to filter courses
    function filterCourses() {
        const searchTerm = courseSearchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const title = card.querySelector('.course-title').textContent.toLowerCase();
            const description = card.querySelector('.course-description').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = categoryValue === '' || category === categoryValue;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Function to reset filters
    function resetFilters() {
        courseSearchInput.value = '';
        categoryFilter.value = '';
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    // Function to handle main search form submission
    function handleMainSearch(e) {
        e.preventDefault();
        const searchTerm = mainSearchInput.value.toLowerCase();
        courseSearchInput.value = searchTerm;
        filterCourses();
        
        // Scroll to courses section
        document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Function to open enrollment modal
    function openEnrollmentModal(courseId) {
        const course = courses.find(c => c.id === courseId);
        if (course) {
            selectedCourseTitle.textContent = course.title;
            courseIdInput.value = courseId;
            enrollmentModal.style.display = 'block';
        }
    }
    
    // Function to close modal
    function closeModal() {
        enrollmentModal.style.display = 'none';
    }
    
    // Function to close success modal
    function closeSuccessModal() {
        successModal.style.display = 'none';
    }
    
    // Function to handle form submission
    function handleEnrollmentSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            courseId: courseIdInput.value,
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            education: document.getElementById('education').value,
            paymentMethod: document.getElementById('payment-method').value,
            enrollmentDate: new Date().toISOString()
        };
        
        // Save to local storage
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
        enrollments.push(formData);
        localStorage.setItem('enrollments', JSON.stringify(enrollments));
        
        // Calculate start date (2 weeks from now)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 14);
        startDateSpan.textContent = startDate.toDateString();
        
        // Close enrollment modal and open success modal
        enrollmentModal.style.display = 'none';
        successModal.style.display = 'block';
        
        // Reset form
        enrollmentForm.reset();
    }
    
    // Event Listeners
    courseSearchInput.addEventListener('input', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
    resetFiltersBtn.addEventListener('click', resetFilters);
    mainSearchForm.addEventListener('submit', handleMainSearch);
    
    // Add click event to all enroll buttons
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            openEnrollmentModal(courseId);
        });
    });
    
    // Modal event listeners
    closeModalBtn.addEventListener('click', closeModal);
    closeSuccessModalBtn.addEventListener('click', closeSuccessModal);
    okBtn.addEventListener('click', closeSuccessModal);
    enrollmentForm.addEventListener('submit', handleEnrollmentSubmit);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === enrollmentModal) {
            closeModal();
        }
        if (event.target === successModal) {
            closeSuccessModal();
        }
    });
});