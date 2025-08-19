// AI Evolution Data
const aiEras = [
  {
    id: 1,
    name: "Foundation Era",
    period: "1940s-1960s",
    description: "The birth of artificial intelligence as a field of study, marked by theoretical foundations and early computational experiments.",
    keyBreakthroughs: [
      "1942: Enigma machine broken by Alan Turing's Bombe",
      "1950: Turing Test proposed for machine intelligence",
      "1956: Term 'Artificial Intelligence' coined by John McCarthy",
      "1957: Perceptron developed by Frank Rosenblatt",
      "1958: LISP programming language created",
      "1964: ELIZA chatbot demonstrates natural language processing"
    ],
    notableFigures: [
      "Alan Turing - Father of computer science and AI",
      "John McCarthy - Coined 'Artificial Intelligence'",
      "Frank Rosenblatt - Developed the Perceptron",
      "Marvin Minsky - AI pioneer and co-founder of MIT AI lab"
    ],
    impact: "Established the theoretical foundations for artificial intelligence and demonstrated that machines could potentially think and learn.",
    technologies: ["Neural Networks", "Logic Programming", "Pattern Recognition", "Natural Language Processing"]
  },
  {
    id: 2,
    name: "Knowledge Systems Era",
    period: "1970s-1980s",
    description: "Focus on expert systems and symbolic reasoning, followed by the first AI winter due to unmet expectations and funding cuts.",
    keyBreakthroughs: [
      "1972: DENDRAL expert system for chemical analysis",
      "1976: MYCIN medical diagnosis expert system",
      "1980: First AI winter begins due to funding cuts",
      "1986: Backpropagation algorithm revives neural networks",
      "1987: Stock market crash affects LISP hardware companies"
    ],
    notableFigures: [
      "Edward Feigenbaum - Father of Expert Systems",
      "Geoffrey Hinton - Neural networks and backpropagation",
      "John Hopfield - Hopfield networks"
    ],
    impact: "Demonstrated AI's potential in specialized domains but also revealed limitations of rule-based approaches.",
    technologies: ["Expert Systems", "Knowledge Representation", "Rule-Based Systems", "Backpropagation"]
  },
  {
    id: 3,
    name: "Machine Learning Rise",
    period: "1990s-2000s",
    description: "Shift from knowledge-driven to data-driven approaches, marked by statistical learning and significant AI achievements in games.",
    keyBreakthroughs: [
      "1997: Deep Blue defeats chess champion Garry Kasparov",
      "1998: Practical applications of support vector machines",
      "2002: Roomba introduces AI into households",
      "2006: Geoffrey Hinton's deep learning breakthroughs",
      "2009: ImageNet dataset launched, catalyzing computer vision"
    ],
    notableFigures: [
      "Vladimir Vapnik - Support Vector Machines",
      "Geoffrey Hinton - Deep learning renaissance",
      "Yann LeCun - Convolutional neural networks"
    ],
    impact: "Proved AI could outperform humans in complex strategic tasks and brought AI into everyday consumer products.",
    technologies: ["Support Vector Machines", "Random Forests", "Ensemble Methods", "Computer Vision"]
  },
  {
    id: 4,
    name: "Deep Learning Revolution",
    period: "2010s-2020s",
    description: "Breakthrough period marked by deep neural networks, transformer architecture, and unprecedented AI capabilities across domains.",
    keyBreakthroughs: [
      "2012: AlexNet wins ImageNet competition",
      "2014: Generative Adversarial Networks (GANs) invented",
      "2016: AlphaGo defeats Go champion Lee Sedol",
      "2017: Transformer architecture introduced ('Attention Is All You Need')",
      "2018: GPT-1 demonstrates generative pre-training",
      "2019: GPT-2 shows remarkable text generation",
      "2020: GPT-3 achieves 175 billion parameters"
    ],
    notableFigures: [
      "Ilya Sutskever - Co-creator of AlexNet and GPT models",
      "Ian Goodfellow - Inventor of GANs",
      "Ashish Vaswani - Lead author of Transformer paper",
      "Demis Hassabis - DeepMind founder and AlphaGo creator"
    ],
    impact: "Revolutionized computer vision, natural language processing, and demonstrated superhuman performance in complex games.",
    technologies: ["Convolutional Neural Networks", "Transformers", "GANs", "Reinforcement Learning", "Transfer Learning"]
  },
  {
    id: 5,
    name: "Generative AI Era",
    period: "2020s-Present",
    description: "The democratization of AI through large language models, multimodal systems, and conversational AI that can assist with diverse tasks.",
    keyBreakthroughs: [
      "2022: ChatGPT launches and reaches 100M users in 2 months",
      "2023: GPT-4 introduces multimodal capabilities",
      "2023: Large language models achieve human-level performance on many benchmarks",
      "2024: GPT-4o offers real-time multimodal interactions",
      "2024: Claude and Gemini emerge as competitive alternatives",
      "2025: AI systems begin showing reasoning capabilities"
    ],
    notableFigures: [
      "Sam Altman - CEO of OpenAI, leader of GPT development",
      "Dario Amodei - CEO of Anthropic, creator of Claude",
      "Sundar Pichai - Led Google's AI initiatives including Bard/Gemini"
    ],
    impact: "Made advanced AI accessible to billions, transforming education, content creation, programming, and creative industries.",
    technologies: ["Large Language Models", "Multimodal AI", "Retrieval-Augmented Generation", "AI Alignment", "Human Feedback Learning"]
  },
  {
    id: 6,
    name: "Future AI Era",
    period: "2025-2030",
    description: "Projected developments toward artificial general intelligence, ubiquitous AI integration, and transformative societal changes.",
    keyBreakthroughs: [
      "2025-2027: AGI prototype systems emerge",
      "2028: AI becomes invisible and ubiquitous in daily life",
      "2029: Human-AI collaboration becomes standard in most industries",
      "2030: AI contributes $15.7 trillion to global GDP",
      "2030: Context-aware AI systems understand nuance and emotions",
      "2030: AI-powered scientific discovery accelerates dramatically"
    ],
    notableFigures: [
      "Future AI researchers and entrepreneurs yet to emerge",
      "Policy makers shaping AI governance",
      "Ethicists defining AI alignment principles"
    ],
    impact: "AI is predicted to revolutionize healthcare, education, transportation, and scientific research while raising critical questions about human purpose and AI governance.",
    technologies: ["Artificial General Intelligence", "Neuromorphic Computing", "Quantum-AI Hybrid Systems", "Autonomous AI Agents", "Brain-Computer Interfaces"]
  }
];

// Three.js Scene Setup
let scene, camera, renderer, cube;
let raycaster, mouse;
let hoveredFace = null;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragThreshold = 5;
let rotationSpeed = 0.001;

// UI Elements
const loadingScreen = document.getElementById('loading-screen');
const infoPanel = document.getElementById('info-panel');
const tooltip = document.getElementById('tooltip');
const tooltipText = document.getElementById('tooltip-text');
const closeBtn = document.getElementById('close-panel');

// Initialize the application
function init() {
  setupScene();
  createCube();
  setupEventListeners();
  animate();
  
  // Hide loading screen after initialization
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2000);
}

function setupScene() {
  // Scene
  scene = new THREE.Scene();
  
  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // Renderer
  const canvas = document.getElementById('three-canvas');
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0x4a9eff, 0.8);
  directionalLight.position.set(10, 10, 5);
  scene.add(directionalLight);
  
  const pointLight = new THREE.PointLight(0xe8e8e8, 0.6, 100);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);
  
  // Raycaster for mouse interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
}

function createCube() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  
  // Create materials for each face
  const materials = [];
  
  aiEras.forEach((era, index) => {
    // Create canvas for face texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Glass-like background
    const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(232, 232, 232, 0.15)');
    gradient.addColorStop(0.7, 'rgba(74, 158, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(74, 158, 255, 0.05)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 512, 512);
    
    // Border glow
    context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    context.lineWidth = 2;
    context.strokeRect(10, 10, 492, 492);
    
    // Era name
    context.fillStyle = 'rgba(255, 255, 255, 0.9)';
    context.font = 'bold 36px Arial';
    context.textAlign = 'center';
    
    // Wrap text if needed
    const words = era.name.split(' ');
    let line = '';
    let y = 200;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > 400 && n > 0) {
        context.fillText(line, 256, y);
        line = words[n] + ' ';
        y += 40;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, 256, y);
    
    // Period
    context.fillStyle = 'rgba(212, 175, 55, 0.9)';
    context.font = '24px Arial';
    context.fillText(era.period, 256, y + 40);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create material with glass-like properties
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
      shininess: 100,
      specular: 0x4a9eff
    });
    
    materials.push(material);
  });
  
  cube = new THREE.Mesh(geometry, materials);
  cube.userData = { eras: aiEras };
  scene.add(cube);
  
  // Add subtle rotation animation
  cube.rotation.x = 0.2;
  cube.rotation.y = 0.2;
}

function setupEventListeners() {
  const canvas = document.getElementById('three-canvas');
  let previousMousePosition = { x: 0, y: 0 };
  let hasDragged = false;
  
  // Mouse down
  canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    hasDragged = false;
    dragStart = { x: event.clientX, y: event.clientY };
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });
  
  // Mouse move
  canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };
      
      const dragDistance = Math.sqrt(
        Math.pow(event.clientX - dragStart.x, 2) + 
        Math.pow(event.clientY - dragStart.y, 2)
      );
      
      if (dragDistance > dragThreshold) {
        hasDragged = true;
        cube.rotation.y += deltaMove.x * 0.01;
        cube.rotation.x += deltaMove.y * 0.01;
      }
      
      previousMousePosition = { x: event.clientX, y: event.clientY };
    } else {
      // Handle hover
      updateMousePosition(event);
      handleHover();
    }
  });
  
  // Mouse up
  canvas.addEventListener('mouseup', (event) => {
    if (isDragging && !hasDragged) {
      // This was a click, not a drag
      updateMousePosition(event);
      handleClick();
    }
    isDragging = false;
    hasDragged = false;
  });
  
  // Mouse leave
  canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    hasDragged = false;
    hoveredFace = null;
    hideTooltip();
    canvas.style.cursor = 'grab';
  });
  
  // Zoom with mouse wheel
  canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.1;
    camera.position.z += event.deltaY * zoomSpeed * 0.01;
    camera.position.z = Math.max(2, Math.min(10, camera.position.z));
  });
  
  // Close panel
  closeBtn.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
  });
  
  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function updateMousePosition(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function handleHover() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);
  const canvas = document.getElementById('three-canvas');
  
  if (intersects.length > 0) {
    const faceIndex = Math.floor(intersects[0].faceIndex / 2);
    if (hoveredFace !== faceIndex) {
      hoveredFace = faceIndex;
      if (aiEras[faceIndex]) {
        showTooltip(aiEras[faceIndex]);
      }
    }
    canvas.style.cursor = isDragging ? 'grabbing' : 'pointer';
  } else {
    if (hoveredFace !== null) {
      hoveredFace = null;
      hideTooltip();
    }
    canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
  }
}

function handleClick() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(cube);
  
  if (intersects.length > 0) {
    const faceIndex = Math.floor(intersects[0].faceIndex / 2);
    if (aiEras[faceIndex]) {
      showInfoPanel(aiEras[faceIndex]);
    }
  }
}

function showTooltip(era) {
  tooltipText.textContent = `${era.name} (${era.period})`;
  
  // Position tooltip near mouse
  const canvas = document.getElementById('three-canvas');
  const rect = canvas.getBoundingClientRect();
  const mouseX = (mouse.x + 1) * rect.width / 2 + rect.left;
  const mouseY = (-mouse.y + 1) * rect.height / 2 + rect.top;
  
  tooltip.style.left = mouseX + 'px';
  tooltip.style.top = (mouseY - 40) + 'px';
  tooltip.classList.remove('hidden');
}

function hideTooltip() {
  tooltip.classList.add('hidden');
}

function showInfoPanel(era) {
  // Hide tooltip
  hideTooltip();
  
  // Populate panel content
  document.getElementById('panel-title').textContent = era.name;
  document.getElementById('panel-period').textContent = era.period;
  document.getElementById('panel-description').textContent = era.description;
  
  // Key breakthroughs
  const breakthroughsList = document.getElementById('panel-breakthroughs');
  breakthroughsList.innerHTML = '';
  era.keyBreakthroughs.forEach(breakthrough => {
    const li = document.createElement('li');
    li.textContent = breakthrough;
    breakthroughsList.appendChild(li);
  });
  
  // Notable figures
  const figuresList = document.getElementById('panel-figures');
  figuresList.innerHTML = '';
  era.notableFigures.forEach(figure => {
    const li = document.createElement('li');
    li.textContent = figure;
    figuresList.appendChild(li);
  });
  
  // Technologies
  const techContainer = document.getElementById('panel-technologies');
  techContainer.innerHTML = '';
  era.technologies.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    techContainer.appendChild(span);
  });
  
  // Impact
  document.getElementById('panel-impact').textContent = era.impact;
  
  // Show panel
  infoPanel.classList.remove('hidden');
}

function animate() {
  requestAnimationFrame(animate);
  
  // Gentle rotation when not being manipulated
  if (!isDragging && hoveredFace === null) {
    cube.rotation.y += rotationSpeed;
  }
  
  // Glow effect based on hover
  if (hoveredFace !== null) {
    // Add glow effect to hovered face
    const materials = cube.material;
    materials.forEach((material, index) => {
      if (index === hoveredFace) {
        material.emissive.setHex(0x112244);
        material.opacity = 0.9;
      } else {
        material.emissive.setHex(0x000000);
        material.opacity = 0.7;
      }
    });
  } else {
    // Reset materials
    const materials = cube.material;
    materials.forEach(material => {
      material.emissive.setHex(0x000000);
      material.opacity = 0.8;
    });
  }
  
  renderer.render(scene, camera);
}

// Start the application
init();