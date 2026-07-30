const { favicons } = require("favicons");
const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "../public/icons/logo.png");

const configuration = {
  appName: "Bajrangi Verma Advocate",
  appShortName: "BV Advocate",
  appDescription: "Professional Legal Services",
  developerName: "Bajrangi Verma",
  background: "#0B0B0B",
  theme_color: "#0B0B0B",
  display: "standalone",
  start_url: "/",
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    windows: false,
    yandex: false
  }
};

favicons(source, configuration).then((response) => {
  response.images.forEach((image) => {
    fs.writeFileSync(
      path.join(__dirname, "../public", image.name),
      image.contents
    );
  });

  response.files.forEach((file) => {
    fs.writeFileSync(
      path.join(__dirname, "../public", file.name),
      file.contents
    );
  });

  console.log("✅ Favicons generated successfully!");
});