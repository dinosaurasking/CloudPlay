document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.auth-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.toggle('active', item === tab));
      panels.forEach((panel) => {
        const isActive = panel.id === `${tab.dataset.tab}-panel`;
        panel.classList.toggle('active', isActive);
      });
    });
  });

  const modal = document.getElementById('librarySyncModal');
  const libraryButton = document.querySelector('.soft-button.primary');
  const modalClose = document.querySelector('.modal-close');

  if (libraryButton && modal) {
    libraryButton.addEventListener('click', () => {
      modal.classList.add('is-visible');
      modal.setAttribute('aria-hidden', 'false');
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('is-visible');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  const serverSelect = document.getElementById('serverSelect');
  const latencyText = document.getElementById('latencyText');
  const routeLatency = document.getElementById('routeLatency');
  const serverStatusClass = document.getElementById('serverStatusClass');
  const routeValue = document.getElementById('routeValue');

  const setServerState = (value) => {
    const isVirginia = value === 'va';
    const routeText = isVirginia ? 'Fortnite Fast-Path Route' : 'Standard CloudPlay Route';
    const routeMs = isVirginia ? '8ms' : '14ms';
    const latencyMs = isVirginia ? '12ms' : '45ms';

    if (latencyText) {
      latencyText.textContent = latencyMs;
      latencyText.className = isVirginia ? 'latency optimal' : 'latency good';
    }

    if (routeLatency) {
      routeLatency.textContent = routeMs;
      routeLatency.className = isVirginia ? 'latency optimal' : 'latency good';
    }

    if (routeValue) routeValue.textContent = routeText;

    if (serverStatusClass) {
      serverStatusClass.className = isVirginia ? 'signal optimal' : 'signal good';
      serverStatusClass.textContent = '●';
    }
  };

  if (serverSelect) {
    serverSelect.addEventListener('change', (event) => {
      setServerState(event.target.value);
    });

    setServerState(serverSelect.value);
  }

  const stressButton = document.querySelector('.primary-cta');
  if (stressButton) {
    stressButton.addEventListener('click', () => {
      const selected = serverSelect ? serverSelect.value : 'va';
      const nextValue = selected === 'va' ? 'va' : 'or';
      if (serverSelect) serverSelect.value = nextValue;
      setServerState(nextValue);
    });
  }
});
