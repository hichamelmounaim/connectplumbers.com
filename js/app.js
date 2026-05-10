document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(link =>
      link.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ===== Water Usage Calculator =====
  const waterForm = document.getElementById('water-form');
  if (waterForm) {
    waterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const people = parseInt(document.getElementById('w-people').value) || 1;
      const showerMin = parseFloat(document.getElementById('w-shower').value) || 0;
      const showerPerDay = parseFloat(document.getElementById('w-showers-day').value) || 1;
      const toiletFlushes = parseFloat(document.getElementById('w-toilet').value) || 0;
      const dishwasherWeek = parseFloat(document.getElementById('w-dishwasher').value) || 0;
      const laundryWeek = parseFloat(document.getElementById('w-laundry').value) || 0;
      const waterRate = parseFloat(document.getElementById('w-rate').value) || 0.005;

      // Gallons per use (US averages)
      const showerGalPerMin = 2.0;
      const toiletGalPerFlush = 1.6;
      const dishwasherGalPerLoad = 6;
      const laundryGalPerLoad = 20;

      const dailyShower = showerMin * showerPerDay * showerGalPerMin * people;
      const dailyToilet = toiletFlushes * toiletGalPerFlush * people;
      const dailyDishwasher = (dishwasherWeek * dishwasherGalPerLoad) / 7;
      const dailyLaundry = (laundryWeek * laundryGalPerLoad) / 7;

      const dailyTotal = dailyShower + dailyToilet + dailyDishwasher + dailyLaundry;
      const monthlyTotal = dailyTotal * 30;
      const monthlyCost = monthlyTotal * waterRate;

      const resultBox = document.getElementById('water-result');
      resultBox.innerHTML = `
        <div class="result-item"><span class="label">🚿 Showers</span><span class="value">${dailyShower.toFixed(0)} gal/day</span></div>
        <div class="result-item"><span class="label">🚽 Toilet</span><span class="value">${dailyToilet.toFixed(0)} gal/day</span></div>
        <div class="result-item"><span class="label">🍽️ Dishwasher</span><span class="value">${dailyDishwasher.toFixed(1)} gal/day</span></div>
        <div class="result-item"><span class="label">👕 Laundry</span><span class="value">${dailyLaundry.toFixed(1)} gal/day</span></div>
        <div class="result-total"><span>Monthly Total</span><span>${monthlyTotal.toFixed(0)} gallons</span></div>
        <div class="result-total" style="border-color:var(--accent-green);margin-top:8px"><span>Est. Monthly Cost</span><span style="color:var(--accent-green)">$${monthlyCost.toFixed(2)}</span></div>
      `;
      resultBox.classList.add('visible');
    });
  }

  // ===== Pipe Size Calculator =====
  const pipeForm = document.getElementById('pipe-form');
  if (pipeForm) {
    pipeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fixtures = parseInt(document.getElementById('p-fixtures').value) || 0;
      const flowRate = parseFloat(document.getElementById('p-flow').value) || 2.5;

      // Calculate total demand and recommended pipe size
      const totalGPM = fixtures * flowRate;
      let pipeSize, velocity;
      if (totalGPM <= 6) { pipeSize = '½ inch'; velocity = '6.1'; }
      else if (totalGPM <= 12) { pipeSize = '¾ inch'; velocity = '5.8'; }
      else if (totalGPM <= 22) { pipeSize = '1 inch'; velocity = '5.5'; }
      else if (totalGPM <= 36) { pipeSize = '1¼ inch'; velocity = '5.2'; }
      else { pipeSize = '1½ inch or larger'; velocity = '4.8'; }

      const resultBox = document.getElementById('pipe-result');
      resultBox.innerHTML = `
        <div class="result-item"><span class="label">Total Fixtures</span><span class="value">${fixtures}</span></div>
        <div class="result-item"><span class="label">Est. Flow Demand</span><span class="value">${totalGPM.toFixed(1)} GPM</span></div>
        <div class="result-item"><span class="label">Est. Velocity</span><span class="value">${velocity} ft/s</span></div>
        <div class="result-total"><span>Recommended Pipe Size</span><span>${pipeSize}</span></div>
      `;
      resultBox.classList.add('visible');
    });
  }
});



// ============================================
// GLOBAL PREMIUM UX ENHANCEMENTS (Auto-Injected)
// ============================================

(function() {
  // 1. Override native alert with Premium Toast Notifications
  const originalAlert = window.alert;
  window.alert = function(message) {
    let toastContainer = document.getElementById('premium-toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'premium-toast-container';
      toastContainer.style.cssText = 'position:fixed; bottom:30px; right:30px; z-index:99999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.cssText = 'background: #ff4d4f; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 10px 25px rgba(255,77,79,0.4); font-family: system-ui, -apple-system, sans-serif; font-weight: 600; font-size: 14px; transform: translateX(120%); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); display: flex; align-items: center; gap: 12px; pointer-events:auto;';
    toast.innerHTML = '<span style="font-size:20px;">⚠️</span> ' + message;
    
    toastContainer.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    
    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // 2. Global Button Ripple Effect
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button, .btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `position: absolute; background: rgba(255, 255, 255, 0.4); border-radius: 50%; transform: scale(0); animation: rippleAnim 0.6s linear; pointer-events: none; left: ${x}px; top: ${y}px; width: 100px; height: 100px; margin-left: -50px; margin-top: -50px;`;
    
    if(target.style.position === '') target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.innerHTML = '@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }';
      document.head.appendChild(style);
    }

    setTimeout(() => ripple.remove(), 600);
  });

  // 3. Smart Success Particle Animations for specific action buttons
  const triggerKeywords = ['calc', 'convert', 'gen', 'submit', 'estimate'];
  document.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const id = (target.id || '').toLowerCase();
    const text = (target.textContent || '').toLowerCase();
    
    const isActionBtn = triggerKeywords.some(kw => id.includes(kw) || text.includes(kw));
    
    if (isActionBtn) {
      // Create a subtle loading state
      const originalText = target.innerHTML;
      target.style.opacity = '0.8';
      target.style.pointerEvents = 'none';
      target.innerHTML = '<span style="display:inline-block; width:14px; height:14px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin 0.75s linear infinite; margin-right:8px; vertical-align:middle;"></span> Processing...';
      
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = '@keyframes spin { to { transform: rotate(360deg); } }';
        document.head.appendChild(style);
      }

      setTimeout(() => {
        target.innerHTML = originalText;
        target.style.opacity = '1';
        target.style.pointerEvents = 'auto';
        
        // Fire particles from the button
        fireParticles(e.clientX, e.clientY);
      }, 600);
    }
  });

  function fireParticles(x, y) {
    const colors = ['#007bff', '#28a745', '#ffc107', '#17a2b8'];
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      
      particle.style.cssText = `position: fixed; left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; background: ${color}; border-radius: 50%; pointer-events: none; z-index: 99999;`;
      document.body.appendChild(particle);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 50;

      particle.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], {
        duration: Math.random() * 500 + 500,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        fill: 'forwards'
      });

      setTimeout(() => particle.remove(), 1000);
    }
  }
})();
