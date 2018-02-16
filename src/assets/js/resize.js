if (document.getElementById('leftContainer') !== null) {
  setTimeout(function () {
    document.getElementById('leftContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
    document.getElementById('rightContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
  }, 80);
}

window.addEventListener('resize', function () {
  if (document.getElementById('leftContainer') === null) return;
  document.getElementById('leftContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
  document.getElementById('rightContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
});
