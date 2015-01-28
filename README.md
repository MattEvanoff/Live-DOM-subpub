# Live-DOM-subpub
My pub/sub DOM live thing


I made a new jQuery plugin the other day, it is pretty simple, it expands on the idea subscribe/publish idea. Basically it allows you to bind subscriptions to DOM nodes.

You use it like this:

view sourceprint?
01.
//subscribe a node
02.
$(selector).subscribe(
03.
'subscription/name',
04.
function(subName, [arg1], [arg2],...)
05.
{/*do something*/}
06.
);
07.
 
08.
//publish
09.
$.publish(
10.
'subscription/name', [arg1], [arg2],...
11.
);
The idea is that you are probably using sub/pub to keep your DOM interaction separate from your non DOM related javascript. So, when you publish, there is a good chance that the subscriber will take the published information and do something to the DOM based on it. Inside of you sub callback, this is the DOM node following jQuerys normal pattern for this.

You can still setup normal subscriptions like so:

view sourceprint?
1.
$.subscribe(
2.
'subscription/name',
3.
function(subName, [arg1], [arg2],...)
4.
{/*do something*/}
5.
);
One thing to note is that nothing is actually bound to the nodes. In reality the selector that you give is simply saved, and used again when you publish, so this works like .live in that it will even work on nodes added to the DOM after you subscribe. Also like .live though, you must provide the full selector as a string, and you can’t use any of the traversal methods to select your nodes.


Updates:

The two changes are:

It now uses the full words, publish, subscribe, and unsubscribe – this change was because with 1.5, jQuery now has a sub method which I do not want to overwrite.

Also, you can now publish and subscribe multiple tags at once using a space separated list like so:

view sourceprint?
1.
$.publish('first/tag second/tag');
2.
 
3.
$.subscribe('first/tag second/tag', function(){/*do something*/});
This just make it more like the rest of jQuery events and such.

The new version can be downloaded here:
