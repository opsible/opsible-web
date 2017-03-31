import $ from 'jquery';

import 'bootstrap/scss/bootstrap.scss';
import './index.scss';

$(() => {
  let height = $(document).height();

  const $backgroundWhite = $('#background-white');
  const $backgroundBlur = $('#background-blur');

  const origOpacity = $backgroundWhite.css('opacity');

  const parallax = (distanceScrolled) => {
    const percent = distanceScrolled / height;
    const newOpacity = origOpacity - (origOpacity * (percent) * 2);
    const newBlur = percent * 2;
    $backgroundWhite.css('opacity', newOpacity);
    $backgroundBlur.css('opacity', newBlur);
  };

  parallax($(document).scrollTop());

  $(window).resize(() => {
    height = $(document).height();
  });

  $(window).scroll((e) => {
    parallax($(e.currentTarget).scrollTop());
  });

  const $root = $('html, body');

  $(document).on('click', 'a.next', (e) => {
    e.preventDefault();

    $root.animate({
      scrollTop: $($.attr(e.currentTarget, 'href')).offset().top,
    }, 500);
  });
});

