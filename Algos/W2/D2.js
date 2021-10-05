/**
 * Class to represent a queue using an array to store the queued items.
 * Follows a FIFO (First In First Out) order where new items are added to the
 * back and items are removed from the front.
 */
class Queue {
    /**
     * The constructor is executed when instantiating a new Queue() to construct
     * a new instance.
     * @returns {Queue} This new Queue instance is returned without having to
     *    explicitly write 'return' (implicit return).
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds a new given item to the back of this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @param {any} item The new item to be added to the back.
     * @returns {number} The new length of this queue.
     */
    push(item) { 
        // Ultimately, this will be the same as before! 
        this.items.push(item);
        return this.items.length;
    }

    /**
     * Removes the front item from this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {any} The removed item or undefined if this queue was empty.
     */
    pop() { 
        /*
            We COULD use a built in, but I don't like doing that (other than push and pop)

            So how do we handle this? Well, we can shift the item at index 0 to the right
            until it's the last element in the array, then pop it off!
        */
        for(let i = 1; i < this.items.length; i++) {
            let temp = this.items[i-1];
            this.items[i-1] = this.items[i];
            this.items[i] = temp;
        }

        return this.items.pop();
        
    }

    /**
     * Retrieves the front item from this queue without removing it.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {any} The front item of this queue.
     */
    peek() { 
        // It's super easy to check the first item in an array ;)
        return this.items[0];
    }

    /**
     * Returns whether or not this queue is empty.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {boolean}
     */
    isEmpty() { 
        // Same deal as yesterday! 
        return this.items.length === 0;
    }

    /**
     * Returns the size of this queue.
     * - Time: O(?)
     * - Space: O(?)
     * @returns {number} The length.
     */
    size() { 
        // And again, same as yesterday
        return this.items.length;
    }
}

