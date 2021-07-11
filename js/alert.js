const DEFAULT_ALERT_TIME = 3000;

const createAlertNode = (text) => {
  const alertNode = document.createElement('div');
  alertNode.classList.add('alert');
  alertNode.innerHTML = '<p class="alert__text"></p>';

  alertNode.querySelector('.alert__text').textContent = text;

  return alertNode;
};

const onAlertNodeAnimationEnd = ({ currentTarget }) => currentTarget.remove();

export const showAlert = (text, time = DEFAULT_ALERT_TIME) => {
  const alertNode = createAlertNode(text);

  alertNode.style.animationDuration = `${time}ms`;
  alertNode.addEventListener('animationend', onAlertNodeAnimationEnd);

  document.body.appendChild(alertNode);
};

export const hideAlert = () => {
  const alertNode = document.body.querySelector('.alert');
  if (alertNode) {
    alertNode.remove();
  }
};
