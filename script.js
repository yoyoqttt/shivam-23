// header scrolling effect
$(window).on('scroll', function(){
	if($(window).scrollTop()){
      $('header').addClass('nav-show');
		  
	} 
	else{
		$('header').removeClass('nav-show');
	}
	   
})

//hamburger
const navSlide = () => {
	 const hamburger = document.querySelector(".hamburger");
	 const navbar = document.querySelector(".nav-bar");
	 const navLinks = document.querySelectorAll(".nav-bar li");

     hamburger.onclick = () => {
		
	 navbar.classList.toggle("nav-active");
		 
      //Animation links
	 navLinks.forEach((link, index) => {
		if (link.style.animation) {
			link.style.animation = "";
		} else {
			link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7+1}s`;
		   }
		});
	  //hamburger animation
	 hamburger.classList.toggle("toggle");
    }
	 
	}

// Three.js Footer Animation
let scene, camera, renderer, particles;

function initThreeJS() {
	const canvas = document.getElementById('footer-canvas');
	if (!canvas) return;
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
	renderer.setClearColor(0x000000, 0);
	
	// Create particles
	const particleCount = 100;
	const geometry = new THREE.BufferGeometry();
	const positions = new Float32Array(particleCount * 3);
	const colors = new Float32Array(particleCount * 3);
	
	for (let i = 0; i < particleCount * 3; i += 3) {
		positions[i] = (Math.random() - 0.5) * 20;
		positions[i + 1] = (Math.random() - 0.5) * 10;
		positions[i + 2] = (Math.random() - 0.5) * 10;
		
		colors[i] = 0.0;
		colors[i + 1] = 0.6;
		colors[i + 2] = 0.9;
	}
	
	geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
	
	const material = new THREE.PointsMaterial({
		size: 0.1,
		vertexColors: true,
		transparent: true,
		opacity: 0.6
	});
	
	particles = new THREE.Points(geometry, material);
	scene.add(particles);
	
	camera.position.z = 5;
	
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	
	if (particles) {
		particles.rotation.x += 0.001;
		particles.rotation.y += 0.002;
		
		const positions = particles.geometry.attributes.position.array;
		for (let i = 1; i < positions.length; i += 3) {
			positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
		}
		particles.geometry.attributes.position.needsUpdate = true;
	}
	
	renderer.render(scene, camera);
}

// Scroll functionality
function initScrollButtons() {
	const scrollUpBtn = document.getElementById('scroll-up');
	const scrollDownBtn = document.getElementById('scroll-down');
	
	if (scrollUpBtn) {
		scrollUpBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
	
	if (scrollDownBtn) {
		scrollDownBtn.addEventListener('click', () => {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		});
	}
}

// Footer fade animation on scroll
function initFooterFade() {
	const footer = document.getElementById('main-footer');
	if (!footer) return;
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				footer.style.opacity = '0';
				footer.style.transform = 'translateY(50px)';
				footer.style.transition = 'all 0.8s ease';
				
				setTimeout(() => {
					footer.style.opacity = '1';
					footer.style.transform = 'translateY(0)';
				}, 100);
			}
		});
	}, {
		threshold: 0.1
	});
	
	observer.observe(footer);
}

// Handle window resize for Three.js
function onWindowResize() {
	const canvas = document.getElementById('footer-canvas');
	if (!canvas || !camera || !renderer) return;
	
	camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
}

window.addEventListener('resize', onWindowResize);

// Resume download functionality
function downloadResume() {
	// Create a temporary link element
	const link = document.createElement('a');
	link.href = 'attached_assets/shivam AI ml cv_1755891820709.pdf'; // Path to your uploaded PDF
	link.download = 'Shivam_Srivastava_AI_ML_Resume.pdf';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function viewResume() {
	// Open resume in new tab
	window.open('attached_assets/shivam AI ml cv_1755891820709.pdf', '_blank');
}

window.onload = () => {
	navSlide();
	initThreeJS();
	initScrollButtons();
	initFooterFade();
};