/**
 * Class to represent a priority queue element. This is so that the priority
 * property does not need to be stored on the given item itself.
 */
class QElement {
    constructor(element, priority) {
        // element is the given item to be added to the queue.
        this.element = element;
        this.priority = priority;
    }
}

/**
 * Class to represent a PriorityQueue with methods that enforce the correct
 * order of queue items.
 */
class PriorityQueue {
    // An array is used to implement priority
    constructor() {
        this.items = [];
    }

    /**
     * Adds the new item in the correct location in the queue based on priority.
     * - Time: O(n) - Linear, where n is the number of items in the queue. 
     * - Space: O(1) - Constant, because we're using a constant amount of memory regardless of 
     *                 queue size.
     * @param {any} element The item to add.
     * @param {number} priority The importance, low is more important.
     * @returns {number} The new length.
     */
    enqueue(element, priority) {
        const newItem = new QElement(element, priority);

        this.items.push(newItem);
        let i = this.items.length-1;

        while(i > 0 && newItem.priority < this.items[i-1].priority) {
            this.items[i] = this.items[i-1];
            this.items[i-1] = newItem;
            i--;
        }

        return this.size();
    }

    // enqueue(element, priority) { 
    //     /*
    //         So what's the general idea here? Well, we want to start at
    //         one end of our queue (which end is kind of up to us), check each 
    //         item until we find where our new item's priority should slot in.

    //         Let's start there
    //     */
    //     const newItem = new QElement(element, priority);
        
    //     // It needs to be added to the queue one way or another, so
    //     this.items.push(newItem); // Don't do this if you use splice

    //     // Now that that's out of the way
    //     for(let i = 0; i < this.size() - 1; i++) { // i < this.size() if using splice
    //         /*
    //             Notice how I'm stopping BEFORE the last item?

    //             That's because we just added the new item to the back, and
    //             I don't want to compare it against itself.
    //         */
    //         if(this.items[i].priority > newItem.priority) {
    //             /*
    //                 Ok, so we've found an item with a priority greater than our
    //                 new item's priority. Because we started our check from the first 
    //                 item (aka highest priority), that means we need to put our new
    //                 item BEFORE the one we've just found.

    //                 You can use the .splice built in, but if we don't know what
    //                 that's doing (i.e. we don't know it's time/space complexity),
    //                 then let's just do this the hard way.

    //                 In this chunk of code, I've already added the new item, so I'll
    //                 just shift it on down until it's slotted in place
    //             */

    //             // We're starting this loop at the end and working to the left
    //             for(let j = this.size()-1; j > i; j--) {
    //                 this.items[j] = this.items[j-1];
    //                 this.items[j-1] = newItem;
    //             }

    //             // Now that we've shifted it all the way down to where it belongs, we're done!
    //             return this.size();
    //         }
    //     }

    //     /*
    //         If we've made it out of the loop (or never even entered it), then 
    //         our new item is in place because either:
    //             A. It was added to an empty queue
    //             B. It belonged at the end of the queue anyway
    //     */
    //     return this.size();
    // }

    /**
     * Removes and returns the most prioritized item.
     * - Time: O(n) - Linear, where n = the size of the queue. We need to move the item at position
     *                0 to the end of the array by swapping it with the element to the right of it,
     *                one position at a time.
     * - Space: O(1) - Constant. No extra data structures used, no increasing number of variables used
     *                 depending on how many elements in the array, nothin'.
     * @returns {QElement|undefined}.
     */
    dequeue() { 
        /*
            By the definition of our priority queue, the most prioritized
            item is the front of our queue, so we need to use the same logic
            used in dequeuing from our REGULAR queue:

            Shift the first element to the end of the array and pop it off
        */
        
        let toRemove = this.items[0];

        for(let i = 1; i < this.size(); i++) {
            this.items[i-1] = this.items[i];
            this.items[i] = toRemove;
        }

        return this.items.pop();
    }

    /**
     * Checks if this PriorityQueue is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length == 0;
    }

    /**
     * Returns the size of the PriorityQueue
     * - Time: O(1) - Constant
     * - Space: O(1) - Constant
     * @returns {number} the number of items in the PriorityQueue
     */
    size() {
        return this.items.length;
    }
}


let q = new PriorityQueue();
q.enqueue("walk dog", 1);
q.enqueue("make breakfast", 2);
q.enqueue("brush teeth", 3);
q.enqueue("shower", 3);

console.log(q);
q.enqueue("make coffee", 1);
console.log(q);
