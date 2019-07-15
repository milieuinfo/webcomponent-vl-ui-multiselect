(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
      typeof define === 'function' && define.amd ? define(factory) :
          (global.multiselect = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Progressively enhance a multiselect field
   */
  var nameSpace = vl.ns,
      msClass = "js-".concat(nameSpace, "select"),
      msInputClass = "".concat(msClass, "__input"),
      msInputClassMulti = "".concat(msInputClass, "--multi"),
      msInputClassButton = "".concat(msInputClass, "__button"),
      msCtaClass = "".concat(nameSpace, "select__cta"),
      msCtaTitleClass = "".concat(nameSpace, "select__cta__title"),
      msGroupClass = "".concat(nameSpace, "select__group"),
      msListClass = "".concat(nameSpace, "select__list"),
      msListWrapperClass = "".concat(nameSpace, "select__list-wrapper"),
      msWrapperClass = "".concat(nameSpace, "select__wrapper"),
      msFormClass = "".concat(nameSpace, "select__form"),
      msCtaActiveClass = "".concat(msCtaClass, "--active"),
      dataPrefix = "data-".concat(nameSpace),
      msDressedAtt = "".concat(dataPrefix, "multiselect-dressed"),
      msContentAtt = "".concat(dataPrefix, "content"),
      msInputAtt = "".concat(dataPrefix, "input"),
      msRecordsAtt = "".concat(dataPrefix, "records"),
      msRecordAtt = "".concat(dataPrefix, "record"),
      msFocusAtt = "".concat(dataPrefix, "focus"),
      msShowAtt = "".concat(dataPrefix, "show"),
      msSelectedAtt = "".concat(dataPrefix, "selected"),
      msIndexAtt = "".concat(dataPrefix, "index"),
      msLabelAtt = "".concat(dataPrefix, "label"),
      msAtt = "".concat(dataPrefix, "multiselect"),
      msIDAtt = "".concat(dataPrefix, "id"),
      msPlaceholderAtt = "".concat(dataPrefix, "placeholder"),
      msValueAtt = "".concat(dataPrefix, "value"),
      msEmptyAtt = "".concat(dataPrefix, "empty"),
      msSearchEmptyAtt = "".concat(dataPrefix, "search-empty");
  var selectedArrOptions = null;
  /**
   * Eventhandler | selectContainer keyDown
   * @method _selectContentInputKeyDownHandler
   * @param  {event}
   */

  var _selectContentInputKeyDownHandler = function _selectContentInputKeyDownHandler(event) {
    if (event.shiftKey && event.keyCode === 9) {
      event.preventDefault();
      return false;
    }

    switch (event.keyCode) {
      case 27:
      case 9:
        event.preventDefault();
        return false;
    }
  };
  /**
   * Setting the general data attributes & aria tags
   * @method _setVisibilityAttributes
   * @param  {element} field
   * @param  {boolean} dataShow
   */


  var _setVisibilityAttributes = function _setVisibilityAttributes(field, dataShow) {
    field.setAttribute(msShowAtt, dataShow);
    field.setAttribute('aria-hidden', !dataShow);
  };
  /**
   * Generate the enhanced select
   * @method _generateSelect
   * @param  {element} select
   * @return {[arr, uniqId, selectContainer]}
   */


  var _generateSelect = function _generateSelect(select) {
    var arr = [],
        uniqId = vl.util.uniqueId(),
        selectContainer = select.closest(".".concat(msClass)),
        selectWrapper,
        selectForm,
        selectDummyButton,
        selectDummyInput,
        placeholder,
        selectFormInput,
        selectFormInputDescription,
        selectListWrapper,
        selectList,
        optgroups,
        i = 0; // Creating empty elements

    selectWrapper = document.createElement('div');
    selectForm = document.createElement('div');
    selectListWrapper = document.createElement('div');
    selectList = document.createElement('section');
    selectFormInput = document.createElement('input');
    selectFormInputDescription = document.createElement('span'); // Hide normal select field

    vl.util.addClass(select, "".concat(nameSpace, "u-visually-hidden"));
    select.setAttribute('aria-hidden', 'true');
    select.setAttribute('tabindex', '-1'); // Get data-id or generate one

    if (select.hasAttribute(msIDAtt)) {
      uniqId = select.getAttribute(msIDAtt);
    }

    selectContainer.setAttribute(msIDAtt, uniqId); // Fake select field

    selectDummyButton = document.createElement('button');
    selectDummyInput = document.createElement('div');
    selectDummyInput.setAttribute(msFocusAtt, '');
    selectDummyInput.setAttribute('id', uniqId);
    vl.util.addClass(selectDummyInput, msInputClass);
    vl.util.addClass(selectDummyInput, msInputClassMulti);
    selectDummyButton.setAttribute('aria-haspopup', 'true');
    selectDummyButton.setAttribute('aria-expanded', 'false');
    vl.util.addClass(selectDummyButton, msInputClassButton);

    if (select.hasAttribute('disabled') && select.getAttribute('disabled') !== 'false') {
      selectDummyInput.setAttribute('disabled', 'true');
    }

    placeholder = select.querySelector("[".concat(msPlaceholderAtt, "]"));
    selectDummyButton.innerHTML = 'Selecteer item';
    selectContainer.appendChild(selectDummyInput);
    selectContainer.appendChild(selectDummyButton);
    vl.util.addClass(selectWrapper, msWrapperClass);
    selectWrapper.setAttribute(msContentAtt, '');
    selectWrapper.setAttribute('aria-labelledby', uniqId);

    _setVisibilityAttributes(selectWrapper, false);

    selectContainer.appendChild(selectWrapper);
    vl.util.addClass(selectForm, msFormClass);
    selectWrapper.appendChild(selectForm);
    selectFormInput.setAttribute('type', 'text');
    selectFormInput.setAttribute('autocomplete', 'off');
    vl.util.addClass(selectFormInput, "".concat(nameSpace, "input-field"));
    vl.util.addClass(selectFormInput, "".concat(nameSpace, "input-field--block"));
    selectFormInput.setAttribute(msInputAtt, '');
    selectFormInput.setAttribute(msFocusAtt, '');
    selectFormInput.setAttribute('value', '');
    selectFormInput.setAttribute('tabindex', '-1');
    selectFormInput.setAttribute('aria-describedby', "".concat(nameSpace, "selectFormInputDescription").concat(uniqId));
    selectFormInput.setAttribute('aria-haspopup', 'listbox"');
    selectForm.appendChild(selectFormInput);
    selectFormInputDescription.setAttribute('id', "".concat(nameSpace, "selectFormInputDescription").concat(uniqId));
    selectFormInputDescription.innerHTML = 'U bevindt zich in de zoekfunctie van een dropdown menu met multiselect in een formulier. Navigeer door de opties met de pijltjes en selecteer met enter. Gebruik escape om de dropdown te sluiten.';
    vl.util.addClass(selectFormInputDescription, "".concat(nameSpace, "u-visually-hidden"));
    selectForm.appendChild(selectFormInputDescription); // Select List Wrapper

    vl.util.addClass(selectListWrapper, msListWrapperClass);
    selectListWrapper.setAttribute('role', 'listbox');
    selectWrapper.appendChild(selectListWrapper); // Select list

    vl.util.addClass(selectList, msListClass);
    selectList.setAttribute(msRecordsAtt, '');
    selectListWrapper.appendChild(selectList); // Generate option groups based on optgroups in real select

    optgroups = select.querySelectorAll('optgroup');

    if (optgroups.length) {
      vl.util.each(optgroups, function (optgroup) {
        var label = optgroup.getAttribute('label'),
            selectOptionGroupWrapper = document.createElement('section');
        vl.util.addClass(selectOptionGroupWrapper, msGroupClass);
        selectOptionGroupWrapper.setAttribute(msLabelAtt, label);
        selectOptionGroupWrapper.setAttribute('role', 'group');
        selectList.appendChild(selectOptionGroupWrapper);
      });
    }
    /**
     * Generate list items based on options in real select
     * @method vl.util.each
     * @param  {object} selectOption
     * @param  {object} opt
     *
     */


    vl.util.each(select.options, function (opt) {
      var value = opt.value,
          label = opt.innerHTML,
          selectOption = document.createElement('div'),
          selectOptionButton = document.createElement('button'),
          selectOptionTitleSpan = document.createElement('span'),
          closestOptGroup,
          closestGeneratedOptGroup;

      if (!opt.hasAttribute(msPlaceholderAtt)) {
        vl.util.addClass(selectOption, "".concat(nameSpace, "select__item"));
      }

      vl.util.addClass(selectOptionButton, msCtaClass); // If option is selected set the element active and change the label in the DummyInput

      if (opt.selected) {
        vl.util.addClass(selectOptionButton, msCtaActiveClass);
        selectOptionButton.setAttribute('aria-selected', 'true');
      } else {
        selectOptionButton.setAttribute('aria-selected', 'false');
      }

      selectOptionButton.setAttribute('type', 'button');
      selectOptionButton.setAttribute(msIndexAtt, i);
      selectOptionButton.setAttribute(msValueAtt, value);
      selectOptionButton.setAttribute(msLabelAtt, label);
      selectOptionButton.setAttribute(msRecordAtt, '');
      selectOptionButton.setAttribute(msFocusAtt, '');
      selectOptionButton.setAttribute('role', 'option');
      selectOptionButton.setAttribute('tabindex', '-1'); // Title (span wrapper)

      vl.util.addClass(selectOptionTitleSpan, msCtaTitleClass);
      selectOptionTitleSpan.innerHTML = label; // Appends

      selectOptionButton.appendChild(selectOptionTitleSpan);
      selectOption.appendChild(selectOptionButton); // Assign to option group if available

      closestOptGroup = opt.closest('optgroup');

      if (closestOptGroup === null) {
        selectList.appendChild(selectOption);
      } else {
        closestGeneratedOptGroup = selectList.querySelector("[".concat(msLabelAtt, "=\"").concat(closestOptGroup.getAttribute('label'), "\"]"));
        closestGeneratedOptGroup.appendChild(selectOption);
      } // Add to arrOptions array


      arr.push(label);
      i++;
    });
    return [arr, uniqId, selectContainer];
  };
  /**
   * Generating pills used in the multiselect input field
   * @method _generatePills
   * @param  {select}  select
   * @param  {element} selectContainer
   * @param  {input}   selectDummyInput
   * @param  {element} selectContentListItems
   * @param  {id}      selectId
   * @return {activeOpts}
   */


  var _generatePills = function _generatePills(select, selectContainer, selectDummyInput, selectContentListItems, selectId) {
    var activeOpts = selectContainer.getElementsByClassName(msCtaActiveClass); // Clear all elements

    selectDummyInput.innerHTML = ''; // If present: generate pills based on active options

    if (activeOpts.length > 0) {
      vl.util.each(activeOpts, function (item) {
        var pillWrapper = document.createElement('div'),
            pillSpan = document.createElement('span'),
            pillCta = document.createElement('a');

        var _ctaEvent = function _ctaEvent(event) {
          var correspondingItem;
          event.preventDefault();
          correspondingItem = selectContainer.querySelector("[".concat(msRecordAtt, "][").concat(msValueAtt, "=\"").concat(item.getAttribute(msValueAtt), "\"]"));
          vl.util.removeClass(correspondingItem, msCtaActiveClass); // Generate Pills

          _generatePills(select, selectContainer, selectDummyInput, selectContentListItems, selectId); // Set selectfield options


          selectedArrOptions = _setOriginalSelectFieldOptions(selectId, selectContentListItems);
          event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        };

        var _ctaKeydownEvent = function _ctaKeydownEvent(event) {
          if (event.keyCode === 13) {
            _ctaEvent(event);
          }
        };

        vl.util.addClass(pillWrapper, "".concat(nameSpace, "pill"));
        vl.util.addClass(pillWrapper, "".concat(nameSpace, "pill--closable"));
        selectDummyInput.appendChild(pillWrapper);
        pillSpan.innerHTML = item.getAttribute(msLabelAtt);
        pillWrapper.appendChild(pillSpan);
        vl.util.addClass(pillCta, "".concat(nameSpace, "pill__close"));
        pillCta.setAttribute('href', '#');
        pillCta.setAttribute(msValueAtt, item.getAttribute(msValueAtt));
        pillCta.innerHTML = 'verwijder optie'; // Remove pill on click/keyup(enter)

        pillCta.addEventListener('click', _ctaEvent);
        pillCta.addEventListener('keyup', _ctaKeydownEvent);
        pillWrapper.appendChild(pillCta);
      });
    } else {
      // Set placeholder or empty field
      var placeholder = select.querySelector("[".concat(msPlaceholderAtt, "]"));

      if (placeholder === null) {
        selectDummyInput.innerHTML = '';
      } else {
        selectDummyInput.innerHTML = placeholder.label;
      }
    }

    return activeOpts;
  };
  /**
   * Generate the "no results found" option
   * @method _setNoResultsFoundElement
   * @param  {string} state
   * @param  {element} selectContainer
   * @param  {element} selectContentList
   */


  var _setNoResultsFoundElement = function _setNoResultsFoundElement(state, selectContainer, selectContentList) {
    var prevEl, noResultsFoundElement, noResultsFoundElementContent;

    switch (state) {
      case 'show':
        prevEl = selectContentList.querySelector("[".concat(msEmptyAtt, "]"));

        if (prevEl === null) {
          noResultsFoundElement = document.createElement('div');
          noResultsFoundElementContent = document.createElement('div');
          vl.util.addClass(noResultsFoundElement, "".concat(nameSpace, "select__item"));
          selectContentList.appendChild(noResultsFoundElement);
          vl.util.addClass(noResultsFoundElementContent, "".concat(nameSpace, "select__empty"));
          noResultsFoundElementContent.setAttribute(msEmptyAtt, '');

          if (selectContainer.hasAttribute(msSearchEmptyAtt)) {
            noResultsFoundElementContent.innerHTML = selectContainer.getAttribute(msSearchEmptyAtt);
          } else {
            noResultsFoundElementContent.innerHTML = 'No results found';
          }

          noResultsFoundElement.appendChild(noResultsFoundElementContent);
        }

        break;

      case 'hide':
        prevEl = selectContentList.querySelector("[".concat(msEmptyAtt, "]"));

        if (prevEl !== null) {
          vl.util.removeElement(prevEl);
        }

        break;
    }
  };
  /**
   * Setting the options in the hidden select field equal to the element selected in the generated select
   * @method _setOriginalSelectFieldOptions
   * @param  {id} selectId
   * @param  {element} selectContentListItems
   * @return {arrOptions}
   */


  var _setOriginalSelectFieldOptions = function _setOriginalSelectFieldOptions(selectId, selectContentListItems) {
    var event = new Event('change'),
        sel = document.querySelector(".".concat(msClass, "[").concat(msIDAtt, "=\"").concat(selectId, "\"] select")),
        arrOptions = [],
        values = [],
        opts = sel.options;
    vl.util.each(selectContentListItems, function (item) {
      if (vl.util.hasClass(item, msCtaActiveClass)) {
        arrOptions.push(item);
        values.push(item.getAttribute(msValueAtt));
      }
    });
    vl.util.each(opts, function (opt) {
      opt.selected = false;
      vl.util.each(values, function (value) {
        if (opt.value === value) {
          opt.selected = true;
        }
      });
    });
    sel.dispatchEvent(event); // Return selected all options

    return arrOptions;
  };
  /**
   * Multiselect
   *
   * Public Methods
   * --------------
   * @method dress(element)
   * @method dressAll
   * @method setDisabledState(select, state)
   */


  var Multiselect =
      /*#__PURE__*/
      function () {
        function Multiselect() {
          _classCallCheck(this, Multiselect);
        }

        _createClass(Multiselect, [{
          key: "contructor",
          value: function contructor() {
            this.lastSelectId = null;
            this.lastContainer = null;
          }
          /**
           * Dresses vl.util.each instance of multiselect
           * @method dress
           * @param  {select} selectField
           */

        }, {
          key: "dress",
          value: function dress(selectField) {
            // Variables needed in Generate selects based on original <select> element
            var arr = _generateSelect(selectField),
                arrOptions = arr[0],
                selectId = arr[1],
                selectContainer = arr[2],
                activeArrOptions = arrOptions,
                // = options that are shown
                selectDummyInput = selectContainer.querySelector(".".concat(msInputClass)),
                selectContent = selectContainer.querySelector("[".concat(msContentAtt, "]")),
                selectContentInput = selectContent.querySelector("[".concat(msInputAtt, "]")),
                selectContentList = selectContent.querySelector("[".concat(msRecordsAtt, "]")),
                selectContentListItems = selectContent.querySelectorAll("[".concat(msRecordAtt, "]")),
                curOption,
                curOptionIndex = 0;

            selectedArrOptions = _generatePills(selectField, selectContainer, selectDummyInput, selectContentListItems, selectId, selectedArrOptions); // = options that are selected

            selectField.setAttribute(msDressedAtt, true);
            /**
             * Set state of vl.util.each selectContent
             * @method _setSelectState
             * @param  {Boolean} isShown
             */

            var _setSelectState = function _setSelectState(isShown) {
              var dataShow = false,
                  ariaHidden = true,
                  ariaExpanded = false;

              if (isShown) {
                dataShow = true;
                ariaHidden = false;
                ariaExpanded = true;
              }

              selectContent.setAttribute(msShowAtt, dataShow);
              selectContent.setAttribute('aria-hidden', ariaHidden);
              selectContent.setAttribute('aria-expanded', ariaExpanded);
            };
            /**
             * Handles keyDown and keyUp keyboard event
             * @method _keyHandler
             * @param  {event} event
             * @param  {string} direction ['up', 'down']
             */


            var _keyHandler = function _keyHandler(event, direction) {
              var directionIsUp = direction === 'up' ? true : direction === 'down' ? false : null,
                  changeParameter = directionIsUp ? curOptionIndex > 0 : curOptionIndex < activeArrOptions - 1;
              event.preventDefault();

              if (selectContent.getAttribute(msShowAtt) !== 'true') {
                // Tonen bij arrow down en index 1 verhogen wodat je op dezelfde positie zit bij het openen
                _setSelectState(true);

                directionIsUp ? curOptionIndex++ : curOptionIndex--;
              }

              if (changeParameter) {
                var el = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"").concat(curOptionIndex, "\"]"));
                directionIsUp ? curOptionIndex-- : curOptionIndex++;
                curOption.removeAttribute(msSelectedAtt);
                el.setAttribute(msSelectedAtt, 'true');
                el.focus();

                if (selectContentInput === null) {
                  selectDummyInput.focus();
                } else {
                  selectContentInput.focus();
                }
              }
            };
            /**
             * Set current option
             * @method _setCurrentOption
             */


            var _setCurrentOption = function _setCurrentOption() {
              curOption = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msSelectedAtt, "=\"true\"]"));
              curOption === null ? curOption = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]")) : null;
              curOptionIndex = curOption.getAttribute(msIndexAtt);
            };
            /**
             * Reset options
             * @method _resetOptions
             */


            var _resetOptions = function _resetOptions() {
              vl.util.each(arrOptions, function (item) {
                var el = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msLabelAtt, "=\"").concat(item, "\"]"));
                el.removeAttribute(msSelectedAtt);
                el.setAttribute(msShowAtt, 'true');
                el.setAttribute(msIndexAtt, arrOptions.findIndex(item));

                if (selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]")) !== null) {
                  selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]")).setAttribute(msSelectedAtt, 'true');
                }
              });
            };
            /**
             * Handles default keypress
             * @method _keyDefaultHandler
             * @param  {element} selectedEl
             */


            var _keyDefaultHandler = function _keyDefaultHandler(selectedEl) {
              selectedEl = selectedEl || null;

              if (selectContentInput !== null) {
                var val = selectContentInput.value,
                    el;
                activeArrOptions = [];
                vl.util.each(arrOptions, function (item) {
                  el = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msLabelAtt, "=\"").concat(item, "\"]")); // Set visibility hidden of all items & remove index of all items & remove old focus

                  el.setAttribute(msShowAtt, 'false');
                  el.removeAttribute(msIndexAtt);
                  el.removeAttribute(msSelectedAtt); // If substring is present in string show item and push to array

                  if (item.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    el.setAttribute(msShowAtt, 'true');
                    activeArrOptions.push(item);
                  }

                  if (activeArrOptions.length) {
                    _setNoResultsFoundElement('hide', selectContainer, selectContentList);

                    vl.util.each(activeArrOptions, function (opt, i) {
                      selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msLabelAtt, "=\"").concat(opt, "\"]")).setAttribute(msIndexAtt, i);
                    }); // Set focus on first element

                    if (selectedEl === null) {
                      var _el = selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]"));

                      _el === null ? null : _el.setAttribute(msSelectedAtt, 'true');
                    } else {
                      selectedEl.setAttribute(msSelectedAtt, 'true');
                      window.setTimeout(function () {
                        selectedEl.focus();
                        selectContentInput.focus();
                      }, 1);
                    }
                  } else {
                    _setNoResultsFoundElement('show', selectContainer, selectContentList);
                  }

                  var optgroups = selectContentList.querySelectorAll(".".concat(msGroupClass));
                  vl.util.each(optgroups, function (optgroup) {
                    var items = optgroup.querySelectorAll(".".concat(msCtaClass, "[").concat(msShowAtt, "=\"true\"]"));
                    items.length ? optgroup.style.display = 'block' : optgroup.style.display = 'none';
                  });
                });
              }
            };
            /**
             *
             * @method _selectContentInputKeyUpHandler
             * @param  {event} event
             */


            var _selectContentInputKeyUpHandler = function _selectContentInputKeyUpHandler(event) {
              event.preventDefault();
              /**
               * If Tab + Shift key are pressed
               * @method if
               * @param  {tabKey && shiftKey} event
               */

              if (event.shiftKey && event.keyCode === 9) {
                _setSelectState(false);

                selectDummyInput.focus();
              }

              activeArrOptions.length <= 0 ? _resetOptions() : _setCurrentOption();
              /**
               * Handles keypresses
               * @method switch
               * @param  {keypress} event
               */

              switch (event.keyCode) {
                case 9: // Tab Key

                case 27:
                  // Esc key
                  vl.util.triggerEvent(document, 'click');
                  selectDummyInput.focus();
                  break;

                case 8:
                  // Backspace key
                  _resetOptions();

                  _keyDefaultHandler();

                  break;

                case 32:
                  // Space key
                  selectField.getAttribute(msShowAtt) === 'true' ? null : selectDummyInput.click();
                  break;

                case 13:
                  // Enter key
                  if (selectField.getAttribute(msShowAtt) === true) {
                    curOption.click();
                  } else {
                    _setSelectState(true);

                    selectContentInput === null ? selectDummyInput.focus() : selectContentInput.focus();
                  }

                  break;

                case 38:
                  // Arrow up key
                  activeArrOptions.length > 0 ? _keyHandler(event, 'up') : null;
                  break;

                case 40:
                  // Arrow down key
                  activeArrOptions.length > 0 ? _keyHandler(event, 'down') : null;
                  break;

                default:
                  _keyDefaultHandler();

                  break;
              }
            };
            /**
             * Handles events on keydown on the selectContainer
             * @method _selectContainerKeyDownEventHandler
             * @param  {event}
             */


            var _selectContainerKeyDownEventHandler = function _selectContainerKeyDownEventHandler(event) {
              if (event.shiftKey && event.keyCode === 9) {
                event.preventDefault();
                return false;
              }

              switch (event.keyCode) {
                case 27:
                case 9:
                  event.preventDefault();
                  return false;
              }
            };
            /**
             * Eventhandles | selectDummyInput Click
             * @method _selectDummyInputClickEventHandler
             */


            var _selectDummyInputClickEventHandler = function _selectDummyInputClickEventHandler() {
              if (selectContent.getAttribute(msShowAtt) === 'false') {
                // Show select
                _setSelectState(true); // Set focus on search if present


                if (selectContentInput !== null) {
                  selectContentInput.focus();
                } // Select first element in generated records


                if (selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]")) !== null) {
                  selectContentList.querySelector("[".concat(msRecordAtt, "][").concat(msIndexAtt, "=\"0\"]")).setAttribute(msSelectedAtt, 'true');
                }
              } else {
                _setSelectState(false);
              }
            };
            /**
             * Loop through dynamically generated records
             * @type {selectListItems}
             */


            vl.util.each(selectContentListItems, function (item) {
              item.addEventListener('click', function () {
                // Toggle active class to selected element
                vl.util.toggleClass(item, msCtaActiveClass); // Set selected state to original select

                selectedArrOptions = _setOriginalSelectFieldOptions(selectId, selectContentListItems); // Generate pills

                _generatePills(selectField, selectContainer, selectDummyInput, selectContentListItems, selectId); // Set focus


                selectContentInput === null ? selectDummyInput.focus() : selectContentInput.focus(); // Remove query in select input

                if (selectContentInput !== null) {
                  selectContentInput.value = '';

                  _keyDefaultHandler(selectContentList.querySelector("[".concat(msSelectedAtt, "=\"true\"]")));
                }
              });
            }); // Eventhandlers

            selectContentInput ? selectContentInput.addEventListener('keyup', _selectContentInputKeyUpHandler) : null;
            selectContentInput ? selectContentInput.addEventListener('keydown', _selectContentInputKeyDownHandler) : null;
            selectContainer ? selectContainer.addEventListener('keydown', _selectContainerKeyDownEventHandler) : null;
            selectDummyInput ? selectDummyInput.addEventListener('click', _selectDummyInputClickEventHandler) : null;
            /**
             * Set state of select on click outside of select
             * @event
             */

            document.addEventListener('click', function () {
              _setSelectState(false);
            });
            selectContainer.addEventListener('click', function (event) {
              event.stopPropagation();
              event.preventDefault();
            });
          }
          /**
           * Select all instances and dress them
           * @method dressAll
           */

        }, {
          key: "dressAll",
          value: function dressAll() {
            var _this = this;

            var elements = document.querySelectorAll("[".concat(msAtt, "]:not([").concat(msDressedAtt, "])"));
            vl.util.each(elements, function (element) {
              _this.dress(element);
            });
          }
          /**
           * Set/remove disabled state of a select
           * @method setDisabledState
           * @param  {select}        select
           * @param  {disabledState} state
           */

        }, {
          key: "setDisabledState",
          value: function setDisabledState(select, state) {
            var selectContainer = select.closest(".".concat(msClass)),
                selectDummyInput = selectContainer.querySelector(".".concat(msInputClass));

            if (state) {
              select.setAttribute('disabled', state);
              selectDummyInput.setAttribute('disabled', state);
            } else {
              select.removeAttribute('disabled');
              selectDummyInput.removeAttribute('disabled');
            }
          }
        }]);

        return Multiselect;
      }();

  return Multiselect;

})));
