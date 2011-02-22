// ========================================================================
// SC Miscellaneous Utils Tests - pointInElement
// ========================================================================

/*global module test htmlbody ok equals same */

var view;

htmlbody('<style> .custom { background-color: #BBF; } .padding { padding: 10px !important; } .border { border: 10px red solid !important;} .margin { margin: 10px !important; } .padding-em { padding: 10em !important; } .border-em { border: 10em red solid !important;} .margin-em { margin: 10em !important; } .child { background-color: #AAA; width: 80px; height: 80px; } .absolute { position: absolute; top: 10px; left: 10px; } </style>');

SC.CustomView = SC.View.extend({
  classNames: 'custom'.w(),
  displayProperties: 'childClasses'.w(),

  render: function(context, firstTime) {
    context = context.begin().addClass('child').setClass(this.get('childClasses'));
    context = context.end();
  }
});

(function() {
var pane = SC.ControlTestPane.design()
  .add("plain child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("padded child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {padding: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("bordered child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {border: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("margined child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {margin: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("margined positioned child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {absolute: true, margin: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("padded bordered child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {padding: true, border: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("bordered margined child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {border: true, margin: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("padded margined child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {padding: true, margin: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("padded bordered margined child", SC.CustomView, {
    classNames: ''.w(),
    childClasses: {padding: true, border: true, margin: true},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  })
  .add("padded parent plain child", SC.CustomView, {
    classNames: 'padded'.w(),
    childClasses: {},
    layout: { left: 10, top: 10, width: 100, height: 50 }
  });

pane.show();



function runChecks(element, offsetAdjust, values) {
  var jqOffset = jQuery(element).offset(),
      left = jqOffset.left,
      top = jqOffset.top;

  equals(SC.pointInElement({x: left + offsetAdjust, y: top + offsetAdjust}, element, 'padding'), values[0], 'point {left: %@, top: %@} within the element\'s padding'.fmt(offsetAdjust, offsetAdjust));
  equals(SC.pointInElement({x: left + offsetAdjust, y: top + offsetAdjust}, element, 'border'), values[1], 'point {left: %@, top: %@} within the element\'s padding'.fmt(offsetAdjust, offsetAdjust));
  equals(SC.pointInElement({x: left + offsetAdjust, y: top + offsetAdjust}, element, 'margin'), values[2], 'point {left: %@, top: %@} within the element\'s padding'.fmt(offsetAdjust, offsetAdjust));
}

test("A plain child element", function() {
  var view = pane.view('plain child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, false]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [true, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [true, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A padded child element", function() {
  var view = pane.view('padded child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, false]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [true, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [true, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A bordered child element", function() {
  var view = pane.view('bordered child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, false]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [false, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [false, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A margined child element", function() {
  var view = pane.view('margined child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, true]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [true, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [true, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A margined positioned child element", function() {
  var view = pane.view('margined positioned child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, true]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [true, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [true, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A padded bordered child element", function() {
  var view = pane.view('padded bordered child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, false]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [false, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [false, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A bordered margined child element", function() {
  var view = pane.view('bordered margined child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, true]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [false, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [false, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A padded margined child element", function() {
  var view = pane.view('padded margined child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, true]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [true, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [true, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

test("A padded bordered margined child element", function() {
  var view = pane.view('padded bordered margined child'),
      parentEl = view.$(),
      childEl = view.$('.child');

  runChecks(parentEl, -1, [false, false, false]);   // Test 1px off the top left corner of the parent
  runChecks(parentEl, 0, [true, true, true]);       // Test the top left corner of the parent
  runChecks(parentEl, 1, [true, true, true]);       // Test 1px in the top left corner of the parent
  runChecks(childEl, -11, [false, false, false]);   // Test 11px off the top left corner of the child
  runChecks(childEl, -1, [false, false, true]);    // Test 1px off the top left corner of the child
  runChecks(childEl, 0, [false, true, true]);        // Test the top left corner of the child
  runChecks(childEl, 1, [false, true, true]);        // Test 1px in the top left corner of the child
  runChecks(childEl, 11, [true, true, true]);       // Test 11px in the top left corner of the child
});

})();