const records = {
  profile: {
    index: '00', category: 'PERSONNEL / PROFILE', title: 'The engineer behind the models.',
    description: 'I work across model development, data pipelines, and deployment. My experience spans life insurance risk at Talcott and language systems at Axios.',
    facts: [['EDUCATION', 'M.S. in Data Science', 'University of Memphis / Dec 2025'], ['FOCUS', 'Applied ML & NLP', 'From data preparation to production monitoring']],
    tags: ['Python', 'Machine learning', 'MLOps'], action: 'Open full profile',
    sections: [['Background', 'I am Sai Rohit Reddy Parne, a machine learning engineer with experience in insurance and digital media. I completed my M.S. in Data Science at the University of Memphis in December 2025.'], ['Experience', ['Talcott Financial Group: ML Engineer, June 2025 to present.', 'Axios: AI / ML Engineer, March 2022 to November 2023.']], ['What I work on', 'Predictive models, natural language processing, recommendation systems, data pipelines, and production deployment.']]
  },
  risk: {
    index: '01', category: 'TALCOTT / JUN 2025 - PRESENT', title: 'Modeling insurance risk.',
    description: 'Predictive models for life insurance underwriting, classifiers to flag potentially fraudulent claims, and mortality prediction for actuarial teams.',
    facts: [['ROLE', 'ML Engineer', 'Talcott Financial Group'], ['SYSTEMS', 'Data to deployment', 'Spark pipelines, SQL Server integration, AWS EC2']],
    tags: ['Scikit-learn', 'Spark', 'AWS EC2'], action: 'Open work dossier',
    sections: [['The work', 'Developed predictive models to help underwriters evaluate life insurance applications and a Python random forest classifier to identify potentially fraudulent claims.'], ['My contributions', ['Tuned gradient boosting models for mortality prediction.', 'Used K-means in R to segment clients and NLTK to extract information from policy documents.', 'Built Spark pipelines to transform historical actuarial data.', 'Deployed models on AWS EC2 and created Tableau dashboards for model performance.']], ['Working with other teams', 'Coordinated with data engineers on SQL Server integration, connecting policyholder demographics to the modeling environment. Employer code and internal datasets are private.']]
  },
  language: {
    index: '02', category: 'AXIOS / MAR 2022 - NOV 2023', title: 'Language at newsroom scale.',
    description: 'News summarization, personalized recommendations, semantic archive search, and transcription for digital media workflows.',
    facts: [['ROLE', 'AI / ML Engineer', 'Axios'], ['PRODUCTION', 'Deployed & monitored', 'Docker, Kubernetes, Grafana, Prometheus']],
    tags: ['Hugging Face', 'PyTorch', 'BERT'], action: 'Open work dossier',
    sections: [['The work', 'Developed Hugging Face and PyTorch models to summarize news in Axios Smart Brevity format, alongside content recommendations and search improvements.'], ['My contributions', ['Built personalized recommendations with Scikit-learn and AWS SageMaker.', 'Integrated BERT and Elasticsearch for news archive search.', 'Used Whisper for podcast and interview transcription.', 'Built Spark and Python text processing pipelines and topic models with Gensim and NLTK.']], ['Deployment and feedback', 'Managed Docker and Kubernetes deployments, designed Grafana and Prometheus monitoring dashboards, and analyzed A/B test engagement data using SQL and Pandas. Employer code and internal datasets are private.']]
  },
  stack: {
    index: '03', category: 'ENGINEERING / TOOLKIT', title: 'Beyond the training loop.',
    description: 'The tools I have used to prepare data, train models, serve predictions, and monitor behavior in production.',
    facts: [['MODEL', 'Python / PyTorch', 'Scikit-learn, TensorFlow, Hugging Face'], ['OPERATE', 'AWS / Kubernetes', 'Docker, Grafana, Prometheus']],
    tags: ['SQL', 'Apache Spark', 'Elasticsearch'], action: 'Explore the toolkit',
    sections: [['Model development', 'Python, R, Scikit-learn, PyTorch, TensorFlow, and Keras.'], ['Language and search', 'Hugging Face, NLTK, Gensim, BERT, Elasticsearch, and OpenAI Whisper.'], ['Data systems', 'Apache Spark, SQL Server, Pandas, and Labelbox.'], ['Deployment and visibility', 'AWS EC2, AWS SageMaker, Docker, Kubernetes, Grafana, Prometheus, and Tableau.']]
  }
};

Object.assign(records, window.portfolioProjects || {});
let selected = 'profile';
let soundEnabled = false;
let audioContext;
function beep() {
  if (!soundEnabled) return;
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  if (!AudioEngine) return;
  audioContext ||= new AudioEngine();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.frequency.setValueAtTime(620, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(940, audioContext.currentTime + 0.09);
  gain.gain.setValueAtTime(0.025, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(); oscillator.stop(audioContext.currentTime + 0.13);
}

function selectRecord(key, scroll = false) {
  selected = key;
  const record = records[key];
  document.querySelector('#node-index').textContent = record.index;
  document.querySelector('#file-label').textContent = record.category;
  document.querySelector('#dossier-title').textContent = record.title;
  document.querySelector('#dossier-description').textContent = record.description;
  document.querySelector('#graph-state').textContent = `${key.toUpperCase()} / ACTIVE`;
  document.querySelector('#file-footer').textContent = `${key.toUpperCase()} LOADED`;
  const facts = document.querySelector('#dossier-facts');
  facts.replaceChildren();
  record.facts.forEach(values => {
    const fact = document.createElement('div'); fact.className = 'fact';
    values.forEach((value, index) => { const item = document.createElement(['span', 'p', 'small'][index]); item.textContent = value; fact.append(item); });
    facts.append(fact);
  });
  const tags = document.querySelector('#dossier-tags'); tags.replaceChildren();
  record.tags.forEach(tag => { const item = document.createElement('span'); item.textContent = tag; tags.append(item); });
  const read = document.querySelector('#read-file');
  read.firstChild.textContent = `${record.action} `;
  document.querySelectorAll('[data-section]').forEach(button => {
    const active = button.dataset.section === key;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const content = document.querySelector('.dossier-content');
  content.classList.remove('switching');
  void content.offsetWidth;
  content.classList.add('switching');
  if (scroll && (innerWidth <= 1150 || key in (window.portfolioProjects || {}))) document.querySelector('#dossier').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
  beep();
  if (paused) draw();
}
document.querySelectorAll('[data-section]').forEach(button => button.addEventListener('click', () => selectRecord(button.dataset.section, true)));
document.querySelector('#reset').addEventListener('click', () => { pointer.x = 0; pointer.y = 0; selectRecord('profile'); });

const detail = document.querySelector('#detail-dialog');
document.querySelector('#read-file').addEventListener('click', () => {
  const record = records[selected];
  document.querySelector('#detail-category').textContent = record.category;
  document.querySelector('#detail-title').textContent = record.title;
  const body = document.querySelector('#detail-body'); body.replaceChildren();
  record.sections.forEach(([title, text]) => {
    const heading = document.createElement('h3'); heading.textContent = title; body.append(heading);
    if (Array.isArray(text)) {
      const ul = document.createElement('ul');
      text.forEach(value => { const li = document.createElement('li'); li.textContent = value; ul.append(li); }); body.append(ul);
    } else { const p = document.createElement('p'); p.textContent = text; body.append(p); }
  });
  detail.showModal(); detail.scrollTop = 0; document.body.style.overflow = 'hidden'; beep();
});
document.querySelector('#close-detail').addEventListener('click', () => detail.close());
detail.addEventListener('close', () => { document.body.style.overflow = ''; });
detail.addEventListener('click', event => {
  const r = detail.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) detail.close();
});
document.querySelector('#sound').addEventListener('click', event => {
  soundEnabled = !soundEnabled;
  event.currentTarget.setAttribute('aria-pressed', String(soundEnabled));
  event.currentTarget.setAttribute('aria-label', soundEnabled ? 'Mute interface sound' : 'Enable interface sound');
  event.currentTarget.title = soundEnabled ? 'Mute interface sound' : 'Enable interface sound';
  beep();
});

// A deterministic 2D network, animated as an interface graphic, not model telemetry.
const canvas = document.querySelector('#network');
const ctx = canvas.getContext('2d');
const stage = document.querySelector('.neural-stage');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
let width = 0, height = 0, time = 0, last = 0, frame = 0;
const pointer = { x: 0, y: 0 };
const nodes = Array.from({ length: 36 }, (_, i) => ({ angle: i * Math.PI * 2 / 36, ring: i % 3, phase: i * 1.7 }));
function resize() {
  width = stage.clientWidth; height = stage.clientHeight;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  draw();
}
function arc(radius, start, end, color, lineWidth = 1) {
  ctx.beginPath(); ctx.arc(0, 0, radius, start, end); ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
}
function draw() {
  ctx.clearRect(0, 0, width, height);
  const radius = Math.min(width * 0.39, height * 0.34);
  const color = selected === 'risk' ? '232,180,108' : selected === 'language' ? '155,171,234' : '118,229,216';
  ctx.save(); ctx.translate(width * 0.5 + pointer.x * 5, height * 0.49 + pointer.y * 5);
  arc(radius * 1.15, 0, Math.PI * 2, '#24413b');
  arc(radius * 1.1, time * 0.12, time * 0.12 + 1.65, `rgba(${color},.55)`, 2);
  arc(radius * 1.1, time * 0.12 + Math.PI, time * 0.12 + Math.PI + .8, `rgba(${color},.3)`, 2);
  for (let i = 0; i < 72; i++) {
    const angle = i * Math.PI * 2 / 72;
    const inner = radius * (i % 6 === 0 ? 1.18 : 1.2);
    ctx.beginPath(); ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner); ctx.lineTo(Math.cos(angle) * radius * 1.23, Math.sin(angle) * radius * 1.23);
    ctx.strokeStyle = i % 6 === 0 ? '#618b74' : '#294139'; ctx.lineWidth = 1; ctx.stroke();
  }
  const positions = nodes.map(node => {
    const angle = node.angle + time * (node.ring % 2 ? -.035 : .025);
    const r = radius * (.50 + node.ring * .20 + Math.sin(time * .5 + node.phase) * .025);
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  });
  positions.forEach((node, i) => {
    [3, 7].forEach(offset => {
      const end = positions[(i + offset) % positions.length];
      ctx.beginPath(); ctx.moveTo(node.x, node.y); ctx.lineTo(end.x, end.y); ctx.strokeStyle = `rgba(${color},.12)`; ctx.lineWidth = .7; ctx.stroke();
      if (i % 4 === 0) {
        const progress = (time * .14 + i * .071 + offset * .04) % 1;
        const x = node.x + (end.x - node.x) * progress, y = node.y + (end.y - node.y) * progress;
        ctx.fillStyle = `rgba(${color},.7)`; ctx.fillRect(x - 1, y - 1, 2, 2);
      }
    });
    ctx.beginPath(); ctx.arc(node.x, node.y, i % 3 === 0 ? 2.5 : 1.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(${color},${i % 3 === 0 ? '.9' : '.5'})`; ctx.fill();
  });
  ctx.fillStyle = '#080f0e'; ctx.beginPath(); ctx.arc(0, 0, radius * .35, 0, Math.PI * 2); ctx.fill();
  arc(radius * .35, 0, Math.PI * 2, `rgba(${color},.35)`);
  arc(radius * .40, -time * .2, -time * .2 + Math.PI * 1.2, `rgba(${color},.55)`);
  ctx.restore();
}
function animate(timestamp) {
  if (paused || document.hidden) { frame = 0; last = 0; return; }
  if (last) time += Math.min((timestamp - last) / 1000, .05);
  last = timestamp; draw(); frame = requestAnimationFrame(animate);
}
function startAnimation() { if (!frame && !paused && !document.hidden) frame = requestAnimationFrame(animate); }
function updateMotion() {
  const button = document.querySelector('#motion');
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', paused ? 'Resume animation' : 'Pause animation');
  button.title = paused ? 'Resume animation' : 'Pause animation';
  button.textContent = paused ? '\u25b6' : '\u2161';
  document.querySelector('#motion-state').textContent = paused ? 'SIGNAL PAUSED' : 'SIGNAL ACTIVE';
  if (paused) { cancelAnimationFrame(frame); frame = 0; last = 0; draw(); } else startAnimation();
}
document.querySelector('#motion').addEventListener('click', () => { paused = !paused; updateMotion(); });
reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; updateMotion(); });
document.addEventListener('visibilitychange', startAnimation);
stage.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch') return;
  const r = stage.getBoundingClientRect();
  const x = (event.clientX - r.left) / r.width, y = (event.clientY - r.top) / r.height;
  document.querySelector('#coord-x').textContent = x.toFixed(3);
  document.querySelector('#coord-y').textContent = y.toFixed(3);
  if (!paused) { pointer.x = x - .5; pointer.y = y - .5; }
});
stage.addEventListener('pointerleave', () => { pointer.x = 0; pointer.y = 0; });
new ResizeObserver(resize).observe(stage);
resize(); updateMotion();
