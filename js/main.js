(() => {
  /**
   * `window.scrollY`의 역할을 하는 변수
   */
  let yOffset = 0;
  /**
   * 현재 스크롤 위치(yOffset)보다 이전에 위치한,
   * 스크롤 섹션들의 스크롤 높이(scrollHeight)값의 합
   */
  let prevScrollHeight = 0;
  /**
   * 현재 활성화된 scene 번호
   */
  let currentScene = 0;
  /**
   * 새로운 Scene에 들어가면 true가 됨
   */
  let enterNewScene = false;

  const sceneInfo = [
    // scene-0
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight setting
      scrollHeight: 0, // 해당 section 의 total height
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
      },
      values: {
        // message A
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        // message B
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        // message C
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        // message D
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        // canvas
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvasOpacity: [1, 0, { start: 0.9, end: 1 }],
      },
    },
    // scene-1
    {
      type: 'normal',
      // heightNum: 5, // type normal 에선 heightNum 필요없음
      scrollHeight: 0, // 해당 section 의 total height
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description'),
      },
    },
    // scene-2
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight setting
      scrollHeight: 0, // 해당 section 의 total height
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: [],
      },
      values: {
        // message A
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        // message B
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        // message C
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        // pin B
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        // pin C
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        // canvas
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvasOpacityIn: [0, 1, { start: 0, end: 0.1 }],
        canvasOpacityOut: [1, 0, { start: 0.95, end: 1 }],
      },
    },
    // scene-3
    {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight setting
      scrollHeight: 0, // 해당 section 의 total height
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        // canvas: document.querySelector('.image-blend-canvas'),
        // context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: ['./images/blend-image-1.jpg', './images/blend-image-2.jpg'],
        images: [],
      },
      values: {},
    },
  ];

  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i += 1) {
      imgElem = new Image();
      imgElem.src = `../video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i += 1) {
      imgElem2 = new Image();
      imgElem2.src = `../video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }
  }
  setCanvasImages();

  function setLayout() {
    // 각 scroll section 의 height setting
    for (let i = 0; i < sceneInfo.length; i += 1) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i += 1) {
      totalScrollHeight += sceneInfo[i].scrollHeight;

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }

  /**
   *
   * @param {Array<number>} values 시작값과 끝값을 가지고 있는 parameter
   * @param {number} currentYOffset 현재 Scene 에서 얼마나 scroll 되었는지
   */
  function calcValues(values, currentYOffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    /**
     * 현재 Scene에서 scroll된 범위를 비율로 저장한 변수
     */
    const scrollRatio = currentYOffset / scrollHeight;

    // start, end 사이에 animation 실행
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (partScrollStart <= currentYOffset && currentYOffset <= partScrollEnd) {
        rv = ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (partScrollEnd < currentYOffset) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(values.canvasOpacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;
      case 2:
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(values.canvasOpacityIn, currentYOffset);
        } else {
          objs.canvas.style.opacity = calcValues(values.canvasOpacityOut, currentYOffset);
        }

        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        break;
      case 3:
        break;
      default:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i += 1) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene += 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene <= 0) return;
      currentScene -= 1;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (!enterNewScene) playAnimation();
  }

  window.addEventListener('scroll', () => {
    /**
     * `scrollY` browser에서 얼마나 scroll 했는지를
     * 알 수 있는 변수이다.
     */
    yOffset = window.scrollY;
    scrollLoop();
  });

  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  window.addEventListener('resize', setLayout);
  setLayout();
})();
