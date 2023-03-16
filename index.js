const beeptalkInit = (options = {}) =>{
  
  let paramsString = '';
  
  if(Object.keys(options).length === 0){
    paramsString = Object.entries(options)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    paramsString = '?' + paramsString;
  }
  
  const versionTest = options?.versionTest;
  
  // create a link element for the stylesheet
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://github.com/beeptalk-app/chat-widget/blob/main/style.css';
  document.head.appendChild(link);

  // create the chat icon div element
  const chatIcon = document.createElement('div');
  chatIcon.classList.add('chat-icon');
  chatIcon.onclick = showChat; // attach the onclick event to the function showChat

  // create the image element and set its attributes
  const img = document.createElement('img');
  img.src = 'https://github.com/beeptalk-app/chat-widget/blob/main/logo.webp';
  img.width = '35';
  img.height = '35';

  // append the image element to the chat icon div element
  chatIcon.appendChild(img);

  // create the chat iframe element and set its attributes
  const chatIframe = document.createElement('iframe');
  chatIframe.classList.add('chat-iframe');
  chatIframe.setAttribute('data-src', 'https://dashboard.beeptalk.app/' + (versionTest?'version-test/':'') + 'widget' + paramsString);
  chatIframe.style.display = 'none';

  document.addEventListener('click', function(event) {
    if (!chatIframe.contains(event.target) && !chatIcon.contains(event.target)) {
      chatIframe.style.display = 'none';
    }
  });

  // append the chat icon div and chat iframe elements to the body of the page
  document.body.appendChild(chatIcon);
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
  }
}
