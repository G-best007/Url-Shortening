
(() => {

  'use strict'

  const form = document.querySelector('.form')
  const text = document.querySelector('.text')
  const error = document.querySelector('.error')
  const linkdisplay = document.querySelector('.linkdisplay')
  // const loadedLink = document.querySelector('.loadedLink')
  // const shortenedLink = document.querySelector('.shortenedLink')



  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let inputField = text.value

    if (inputField === '') {
      error.style.display = 'block'
      text.style.border = '3px solid var(--Red)'
      text.classList.add('showError')
    } else {
      error.style.display = 'none'
      text.style.border = 'none'
      text.classList.remove('showError')

      // url
      const apiKey = '6bd9e460b0b848d3a2b0ab2d325819ab'

      const headers = { Accept: "application/json", "Content-Type": "application/json", apikey: apiKey }

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          destination: inputField,
          domain: { fullName: "rebrand.ly" }
        })
      };


      fetch("https://api.rebrandly.com/v1/links", requestOptions)
        .then(response => response.json())
        .then(result => {
          // Assuming linkdisplay is a container element
          const linkdisplay = document.querySelector('.linkdisplay');

          // Create a new article element for each result
          const article = document.createElement('article');
          article.className = 'row card displayLinksParent';

          const displayLinks = document.createElement('div');
          displayLinks.className = 'col-md-12 displayLinks d-flex align-items-center justify-content-between pt-3';

          const paralink = document.createElement('p');
          paralink.className = 'text-black opacity-100 ps-2 paralink loadedLink';
          paralink.textContent = inputField;

          const Urllink = document.createElement('div');
          Urllink.className = 'Urllink d-flex align-items-center pe-3';

          const shortenedLink = document.createElement('p');
          shortenedLink.className = 'text-info fw-bolder pe-md-5 btmborder shortenedLink';
          shortenedLink.textContent = result.shortUrl;

          const copyLinkButton = document.createElement('button');
          copyLinkButton.className = 'btn bg-info text-white mb-3 copyLink';
          copyLinkButton.textContent = 'copy';

          // Append elements to their parent containers
          Urllink.appendChild(shortenedLink);
          Urllink.appendChild(copyLinkButton);

          displayLinks.appendChild(paralink);
          displayLinks.appendChild(Urllink);

          article.appendChild(displayLinks);

          // Append the new article to the container
          linkdisplay.appendChild(article);

          // Now you can access copyLinkButton and attach event listeners, etc.
          copyLinkButton.addEventListener('click', () => {
            navigator.clipboard.writeText(result.shortUrl)
            copyLinkButton.innerHTML = `Copied!`

            setTimeout(() => {
              copyLinkButton.innerHTML = `Copy`
            }, 1000)
          });

        })
        .catch(error => {
          console.error('Error', error)
          // show error response
          if (error.response) {
            console.error('Response:', error.response)
          }
        });






      // result.shortUrl
      // https://web.facebook.com/login/?_rdc=1&_rdr






    }
  })
})()



