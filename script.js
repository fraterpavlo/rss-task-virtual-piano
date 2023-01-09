const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const audio = document.querySelectorAll('audio');
const btnContainer = document.querySelector('.btn-container');
const toggleButtons = document.querySelectorAll('.btn');
const fullScreenBtn = document.querySelector('.fullscreen');

  function playAudioByCode(targetKey) {
    const targetKeyCode = targetKey.dataset.key;
    const sound = document.querySelector(`audio[data-key="${targetKeyCode}"]`);
    sound.currentTime = "0";
    sound.play();
  };

  const keyActivator = (targetKey) => {
    targetKey.classList.add('piano-key-active', 'piano-key-active-pseudo');
  }
  
  const keyDeactivator = (targetKey) => {
    targetKey.classList.remove('piano-key-active', 'piano-key-active-pseudo');
  }

window.addEventListener('keydown', (event) => {
  const targetKey = document.querySelector(`div[data-key="${event.keyCode}"]`);
  if (targetKey == null) {
    return;
  } else {
    playAudioByCode(targetKey);
    keyActivator(targetKey);
  };
});

window.addEventListener('keyup', (event) => {
  const targetKey = document.querySelector(`div[data-key="${event.keyCode}"]`);
  if (targetKey == null) {
    return;
  } else {
    keyDeactivator(targetKey);
  };
});

    const startActive = (event) => {
      event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
      const targetKey = event.target;
      playAudioByCode(targetKey);
    };

    const stopActive = (event) => {
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
    }

  const startListenerOver = (event) => {
    if(event.target.classList.contains('piano-key')) {
      event.target.classList.add('piano-key-active', 'piano-key-active-pseudo')
      const targetKey = event.target;
      playAudioByCode(targetKey);
    };
    pianoKeys.forEach((element) => {
      element.addEventListener('mouseover', startActive);
      element.addEventListener('mouseout', stopActive);
    });
  }; 

  const stopListenerOver = (event) => {
    pianoKeys.forEach((element) => {
      event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
      element.removeEventListener('mouseover', startActive);
      element.removeEventListener('mouseout', stopActive);
    });
  };

piano.addEventListener('mousedown', startListenerOver);
 
document.addEventListener('mouseup', stopListenerOver);

    const labelToggle = (eventBtn) => {
      const pianoKeys = document.querySelectorAll('.piano-key');
      if (eventBtn.classList.contains('btn-notes')) {
        pianoKeys.forEach((element) => {
          element.classList.remove('piano-key-letter');
          element.classList.add('piano-key');
        });
      } else if (eventBtn.classList.contains('btn-letters')){
        pianoKeys.forEach((element) => {
          //element.classList.remove('piano-key');
          element.classList.add('piano-key-letter');
        });
      } else {return console.log('oshibka')};
    }

  const buttonActivator = (event) => {
    if (event.target.classList.contains('btn')){
      const toggleButtons = document.querySelectorAll('.btn');
      toggleButtons.forEach((element) => {
        if (element.classList.contains('btn-active')){
          element.classList.remove('btn-active');
        }
      });
      event.target.classList.add('btn-active');
      const eventBtn = event.target;
      labelToggle(eventBtn);
    }
  };

btnContainer.addEventListener('click', buttonActivator);

function openFullscreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

fullScreenBtn.addEventListener('click', openFullscreen);