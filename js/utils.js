// 包装函数
function perform(callback, wrappers) {
  return function (...args) {
    wrappers.forEach((wrapper) => wrapper.init());
    callback(...args);
    wrappers.forEach((wrapper) => wrapper.close());
  };
}

// 获取像素块
function getPixel(pixelData, x, y) {
  const pixel = [];
  const index = y * pixelData.width * 4 + x * 4;

  for (let i = 0; i < 4; i++) {
    pixel.push(pixelData.data[index + i]);
  }

  return pixel;
}

// 设置像素块
function setPixel(pixelData, x, y, colors) {
  const index = y * pixelData.width * 4 + x * 4;

  for (let i = 0; i < 4; i++) {
    pixelData.data[index + i] = colors[i];
  }
}

// 像素化图片
function pixelated(context, canvas, size = 4) {
  const pixelData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < canvas.width; i += size) {
    for (let j = 0; j < canvas.height; j += size) {
      let color = getPixel(pixelData, i, j);
      let xEnd = i + size;
      let yEnd = j + size;

      if (xEnd > canvas.width) xEnd = canvas.width;
      if (yEnd > canvas.height) yEnd = canvas.height;

      for (let a = i; a < xEnd; a++) {
        for (let b = j; b < yEnd; b++) {
          setPixel(pixelData, a, b, color);
        }
      }
    }
  }

  context.putImageData(pixelData, 0, 0);
}

// 图片下载
function useLink(options) {
  const defaultOptions = Object.assign(
    {
      src: "",
      autoDownload: false,
      type: "image/png",
      filename: "",
    },
    options || {}
  );

  function download() {
    const link = document.createElement("a");
    link.href = defaultOptions.src;
    link.download = defaultOptions.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (defaultOptions.autoDownload) {
    download();
  }
  
  return download;
}
