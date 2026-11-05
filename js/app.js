(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('todo-form');
    var input = document.getElementById('todo-input');
    var errorMsg = document.getElementById('error-msg');
    var list = document.getElementById('todo-list');
    var counter = document.getElementById('counter');
    var filterAll = document.getElementById('filter-all');
    var filterActive = document.getElementById('filter-active');
    var filterDone = document.getElementById('filter-done');

    var currentFilter = 'all';

    function updateCounter() {
      var n = list.querySelectorAll('li:not(.completed)').length;
      counter.textContent = n + (n === 1 ? ' item left' : ' items left');
    }

    function applyFilter() {
      var items = list.querySelectorAll('li');
      for (var i = 0; i < items.length; i++) {
        var li = items[i];
        var done = li.classList.contains('completed');
        var show =
          currentFilter === 'all' ||
          (currentFilter === 'active' && !done) ||
          (currentFilter === 'done' && done);
        li.style.display = show ? '' : 'none';
        li.classList.toggle('hidden', !show);
      }
    }

    function refresh() {
      applyFilter();
      updateCounter();
    }

    function addItem() {
      var text = input.value.trim();
      if (text === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
      errorMsg.classList.add('hidden');

      var li = document.createElement('li');

      var span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'delete-btn';
      btn.textContent = 'Delete';

      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);

      input.value = '';
      refresh();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      addItem();
    });

    // Event delegation: one listener on the list
    list.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li || !list.contains(li)) return;

      if (e.target.closest('.delete-btn')) {
        li.remove();
      } else {
        li.classList.toggle('completed');
      }
      refresh();
    });

    function setFilter(name) {
      currentFilter = name;
      refresh();
    }

    filterAll.addEventListener('click', function () { setFilter('all'); });
    filterActive.addEventListener('click', function () { setFilter('active'); });
    filterDone.addEventListener('click', function () { setFilter('done'); });

    refresh();
  });
})();