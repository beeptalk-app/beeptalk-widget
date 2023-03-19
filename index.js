const beeptalkInit = (options = {}) =>{
  
  let paramsString = '';
  
  if(Object.keys(options).length === 0){
    paramsString = Object.entries(options)
      .map(([key, value]) => {
        if(key!='versionTest'&&key!='darkIcon'&&key!='primaryColor') return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      })
      .join('&');
    paramsString = '?' + paramsString;
  }
  
  const versionTest = options?.versionTest;
  const darkIcon = options?.darkIcon;
  const primaryColor = options?.primaryColor;

  const styleLink = document.createElement('link');
  styleLink.rel = 'stylesheet';
  styleLink.type = 'text/css';
  styleLink.href = 'https://cdn.jsdelivr.net/gh/beeptalk-app/beeptalk-widget@latest/style.min.css';
  document.head.appendChild(styleLink);

  // create the chat icon div element
  const chatIcon = document.createElement('div');
  chatIcon.classList.add('chat-icon');
  chatIcon.style.backgroundColor = primaryColor || '#0384C6';
  chatIcon.onclick = showChat; // attach the onclick event to the function showChat

  // create the image element and set its attributes
  const img = document.createElement('img');
  if(!darkIcon) img.src = 'https://s3.amazonaws.com/appforest_uf/f1679147115457x740024418331006500/white-chat-bubble.png';
  if(darkIcon) img.src = 'https://s3.amazonaws.com/appforest_uf/f1679147275642x724839114675521300/black-chat-bubble.png';
  img.width = 28;
  img.height = 28;

  // append the image element to the chat icon div element
  chatIcon.appendChild(img);

  // create the chat iframe element and set its attributes
  const chatIframe = document.createElement('iframe');
  chatIframe.classList.add('chat-iframe');
  chatIframe.setAttribute('data-src', 'https://dashboard.beeptalk.app/' + (versionTest?'version-test/':'') + 'widget' + paramsString);
  chatIframe.style.display = 'none';

  const chatClose = document.createElement('div');
  chatClose.classList.add('chat-close-icon');
  chatClose.style.display = 'none';
  chatClose.style.cursor = 'pointer';

  const closeImg = document.createElement('img');
  closeImg.src = 'https://s3.amazonaws.com/appforest_uf/f1679008960535x752930425825623900/close.png'
  closeImg.width = 15;
  closeImg.height = 15;

  chatClose.appendChild(closeImg);


  document.addEventListener('click', function(event) {
    if (!chatIframe.contains(event.target) && !chatIcon.contains(event.target)) {
      chatIframe.style.display = 'none';
      chatClose.style.display = 'none';
    }
  });

  // append the chat icon div and chat iframe elements to the body of the page
  document.body.appendChild(chatIcon);
  document.body.appendChild(chatClose);
  document.body.appendChild(chatIframe);

  // Set up an IntersectionObserver to detect when the iframe becomes visible
  let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        // Load the iframe content if it hasn't been loaded yet
        if (!chatIframe.getAttribute('src')) {
          chatIframe.setAttribute('src', chatIframe.getAttribute('data-src'));
        }
      }
    });
  });

  // Observe the iframe element
  observer.observe(chatIframe);

  // Show/hide the iframe when the chat icon is clicked
  function showChat() {
    chatIframe.style.display = chatIframe.style.display === 'none' ? 'block' : 'none';
    chatClose.style.display = chatClose.style.display === 'none' ? 'block' : 'none';
  }
}
