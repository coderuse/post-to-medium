(function (w) {
  'use strict';

  var me = w.MediumEditor,
    d = w.document;

  var meEditable = d.createElement('div');
  meEditable.className = 'me-editor';

  var store = new Store('localStorage');

  var postTitle = d.createElement('div');
  postTitle.className = 'post-title';
  var mePostTitle = new me(postTitle, {
    autoLink: false,
    extensions: {
      'imageDragging': {}
    },
    placeholder: {
      text: 'Title',
      hideOnClick: false
    }
  });
  mePostTitle.subscribe('editableInput', function (event, editable) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      savePost();
    }, 1000);
  });

  var postBody = d.createElement('div');
  postBody.className = 'post-body';
  var mePostBody = new me(postBody, {
    autoLink: true,
    extensions: {
      'imageDragging': {}
    },
    placeholder: {
      text: 'Tell your story...',
      hideOnClick: false
    }
  });
  var timeoutId;
  mePostBody.subscribe('editableInput', function (event, editable) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      savePost();
    }, 1000);
  });

  var guidSet = Util.prototype.getParameterByName('guid', w.location.href);
  if (guidSet === null || guidSet === '') {
    var guid = Util.prototype.guid();
    w.document.location = '?guid=' + guid;
  }
  else {
    var locallySavedPostTitle = store.get(guidSet + '-title');
    if (locallySavedPostTitle) {
      mePostTitle.setContent(locallySavedPostTitle);
    }
    var locallySavedPostBody = store.get(guidSet + '-body');
    if (locallySavedPostBody) {
      mePostBody.setContent(locallySavedPostBody);
    }
  }

  function savePost() {
    store.put(guidSet + '-title', mePostTitle.getContent());
    store.put(guidSet + '-body', mePostBody.getContent());
  }

  $(postTitle).appendTo(meEditable);
  $(postBody).appendTo(meEditable);

  $(meEditable).appendTo('.editor');

} (window));