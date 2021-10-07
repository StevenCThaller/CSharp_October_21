class Stack {
    /**
     * The constructor is executed when instantiating a new Stack() to construct
     * a new instance.
     * @returns {Stack} This new Stack instance is returned without having to
     *    explicitly write 'return' (implicit return).
     */
    constructor(items = []) {
        this.items = items;
    }

    /**
     * Adds a new given item to the top / back of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to be added to the top / back.
     * @returns {number} The new length of this stack.
     */
    push(item) {
        this.items.push(item);
        return this.size();
    }

    /**
     * Removes the top / last item from this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The removed item or undefined if this stack was empty.
     */
    pop() {
        return this.items.pop();
    }

    /**
     * Retrieves the top / last item from this stack without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The top / last item of this stack.
     */
    peek() {
        return this.items[this.items.length - 1];
    }

    /**
     * Returns whether or not this stack is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Returns the size of this stack.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number} The length.
     */
    size() {
        return this.items.length;
    }

    /**
     * Logs the items as a space separated string.
     * - Time: O(n) linear.
     * - Space: O(n) linear.
     * @returns {string} The same string that is logged.
     */
    print() {
        const str = this.items.join(" ");
        console.log(str);
        return str;
    }
}


class Queue {
    /**
     *
     * @param {Array<any>} items The starting items, useful for if you already
     *    have an array of items in the right order and want to convert it to a
     *    queue instance to get access to the queue methods.
     */
    constructor(items = []) {
        this.items = items;
    }

    /**
     * Adds a new given item to the back of this queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @param {any} item The new item to add to the back.
     * @returns {number} The new size of this queue.
     */
    enqueue(item) {
        this.items.push(item);
        return this.size();
    }

    /**
     * Removes and returns the first item of this queue.
     * - Time: O(n) linear, due to having to shift all the remaining items to
     *    the left after removing first elem.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    dequeue() {
        for (let i = 1; i < this.items.length; i++) {
            let temp = this.items[i];
            this.items[i] = this.items[i - 1];
            this.items[i - 1] = temp;
        }

        return this.items.pop();
    }

    /**
     * Retrieves the first item without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {any} The first item or undefined if empty.
     */
    front() {
        return this.items[0];
    }

    /**
     * Returns whether or not this queue is empty.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {boolean}
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Retrieves the size of this queue.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number} The length.
     */
    size() {
        return this.items.length;
    }

    /**
     * Logs the items of this queue.
     * - Time: O(n) linear.
     * - Space: O(n) linear.
     * @returns {string} The same string that is logged.
     */
    print() {
        const str = this.items.join(" ");
        console.log(str);
        return str;
    }

    /**
     * Compares this queue to another given queue to see if they are equal.
     * Avoid indexing the queue items directly via bracket notation, use the
     * queue methods instead for practice.
     * Use no extra array or objects.
     * The queues should be returned to their original order when done.
     * - Time: O(n^2) - Quadratic, because for each of the n elements in the queue, we have to perform n operations.
     * - Space: O(1) - Constant, because no matter how long the list, the number of variables is not changing.
     * @param {Queue} q2 The queue to be compared against this queue.
     * @returns {boolean} Whether all the items of the two queues are equal and
     *    in the same order.
     */
    compareQueues(q2) {
        if (this.size() != q2.size()) {
            return false;
        }

        let isTheSame = true;

        if (this.front() != q2.front()) {
            return false;
        }

        for (let i = 0; i < this.size(); i++) {
            // Checking to see if the front of the queue is the same.
            if (this.front() != q2.front()) {
                isTheSame = false;
            }

            this.enqueue(this.dequeue());
            q2.enqueue(q2.dequeue());
        }

        return isTheSame;
    }

    /**
     * Determines if the queue is a palindrome (same items forward and backwards).
     * Avoid indexing queue items directly via bracket notation, instead use the
     * queue methods for practice.
     * Use only 1 stack as additional storage, no other arrays or objects.
     * The queue should be returned to its original order when done.
     * - Time: O(n^2) - Quadratic, because for each of the n elements in the queue, we must perform n operations (the dequeue)
     * - Space: O(n) - The size of the stack we create increases based on the size of the queue it's being built off of.
     * @returns {boolean}
     */
    isPalindrome() {
        const storage = new Stack();

        // Push each item from the queue into the stack
        while (storage.size() != this.size()) { // O(n)
            storage.push(this.front()); // O(1)

            this.enqueue(this.dequeue()); // Enqueue: O(1), Dequeue: O(n) = O(n)
        }// total time complexity so far: O(n^2)

        // Check that each item at the front of the queue matches the item at the top
        // of the stack, and after that check, dequeue then reenqueue the item to the queue,
        // and just pop the item from the stack
        let isPal = true;

        if (this.front() != storage.peek()) {
            return false;
        }

        while (!storage.isEmpty()) { // O(n)
            if (this.front() != storage.peek()) {
                isPal = false;
            }

            storage.pop(); // O(1)
            this.enqueue(this.dequeue());// O(n)
        }// total time complexity of this while loop: O(n^2)

        return isPal;
    }

    /**
     * Determines whether the sum of the left half of the queue items is equal to
     * the sum of the right half. Avoid indexing the queue items directly via
     * bracket notation, use the queue methods instead for practice.
     * Use no extra array or objects.
     * The queue should be returned to it's original order when done.
     * - Time: O(n^2) - Quadratic - remember, dequeue() is O(n), and our while loop
     *                  is also O(n), so for each of the n elements, we're running
     *                  n iterations.
     * - Space: O(1) - Constant - no extra data structures, just a few variables.
     * @returns {boolean} Whether the sum of the left and right halves is equal.
     */
    isSumOfHalvesEqual() { 
        /**
         * For this algorithm, we want to compare the left and right halves,
         * but we can't use any indexes.
         * 
         * Yesterday, we cycled through the items in a queue via enqueueing and 
         * dequeueing, so we'll do the same thing here, but with a couple of additions:
         * 1. We need to keep track of 2 sums: left and right
         * 2. We also need to keep track of how many items we have seen, so we can compare
         *    it to the queue's size. If the count is less than half of the queue size, the 
         *    item needs to be added to the left half. Otherwise, it gets added to the right
         *    half
         */
        let count = 0;
        let left = 0, right = 0;
        while(count < this.size()) {
            count++;

            if(count <= this.size()/2) {
                left += this.front();
            } else {
                right += this.front();
            }

            this.enqueue(this.dequeue());
        }

        return left === right;
    }
}


/**
 * Class to represent a Queue but is implemented using two stacks to store the
 * queued items without using any other objects or arrays to store the items.
 * Retains the FIFO (First in First Out) ordering when adding / removing items.
 */
class TwoStackQueue {
    constructor() {
        this.stack1 = new Stack(); // the storage of the data itself
        this.stack2 = new Stack(); // used for any methods where you might need to transfer data
    }

    /**
     * Adds a new item to the back of the queue.
     * - Time: O(n) - Linear, we'll be touch each of the n items twice (so technically O(2n)).
     * - Space: O(1) - Constant, because we're not adding any new data structures.
     * @param {any} item To be added.
     * @returns {number} The new number of items in the queue.
     */
    enqueue(item) { 
        /**
         * Given we're using stacks to show off a queue, adding to the back of
         * the queue is essentially adding to the bottom of the stack. But there's
         * no method to do so.
         * 
         * So we'll have to empty out the stack, add the new item to the stack, 
         * then re-add all of the items we emptied. This is where the second stack
         * comes into play
         */
        while(!this.stack1.isEmpty()) {
            this.stack2.push(this.stack1.pop());
        }

        // Now, let's add the item to stack1 (bottom of the stack)
        this.stack1.push(item);

        // And now we'll empty the items from the second stack back into the first one
        while(!this.stack2.isEmpty()) {
            this.stack1.push(this.stack2.pop());
        }
        
        return this.stack1.size();
    }


    /**
     * Removes the next item in the line / queue.
     * - Time: O(1) - Constant, because the array .pop() method is constant time complexity, 
     *                and that's all that's really happening.
     * - Space: O(1) - Constant, because we're not adding any new data structures that rely
     *                 on the number of elements in our current data structure.
     * @returns {any} The removed item.
     */
    dequeue() { 
        /**
         * Let's brainstorm:
         * 
         * If the back of the queue is the bottom of the stack, then the
         * front of the queue would be the top of the stack. Which the
         * stack class already handles!
         */

        return this.stack1.pop();
    }
}