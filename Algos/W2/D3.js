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
        if(this.size() != q2.size()) {
            return false;
        }

        let isTheSame = true;

        if(this.front() != q2.front()) {
            return false;
        }

        for(let i = 0; i < this.size(); i++) {
            // Checking to see if the front of the queue is the same.
            if(this.front() != q2.front()){
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
        while(storage.size() != this.size()) { // O(n)
            storage.push(this.front()); // O(1)

            this.enqueue(this.dequeue()); // Enqueue: O(1), Dequeue: O(n) = O(n)
        }// total time complexity so far: O(n^2)

        // Check that each item at the front of the queue matches the item at the top
        // of the stack, and after that check, dequeue then reenqueue the item to the queue,
        // and just pop the item from the stack
        let isPal = true;

        if(this.front() != storage.peek()) {
            return false;
        }

        while(!storage.isEmpty()) { // O(n)
            if(this.front() != storage.peek()) {
                isPal = false;
            }

            storage.pop(); // O(1)
            this.enqueue(this.dequeue());// O(n)
        }// total time complexity of this while loop: O(n^2)

        return isPal;
    }
}


