class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    seedFromArr(vals) {
        for (const item of vals) {
            this.insertAtBack(item);
        }
        return this;
    }

    toArr() {
        const arr = [];
        let runner = this.head;

        while (runner) {
            arr.push(runner.data);
            runner = runner.next;
        }
        return arr;
    }

    isEmpty() {
        return this.head == null;
    }

    insertAtBack(data) {
        const newNode = new Node(data);
        if(this.isEmpty()) {
            this.head = newNode;
            return this;
        }
        let runner = this.head;
        while(runner.next) {
            runner = runner.next;
        }
        runner.next = newNode;
        return this;
    }

    /**
     * Creates a new node with the given data and inserts that node at the front
     * of this list.
     * - Time: O(1) - Constant, because the number of elements in the list doesn't affect things.
     * - Space: O(1) - Constant, because we're only creating a single new data structure (newHead).
     * @param {any} data The data for the new node.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtFront(data) {
        /**
         * Edge Case: What if the list is empty?
         * Actually, this won't affect anything!
         */
        
        
        // Obviously, we need to create a new node
        const newHead = new Node(data);
        /**
         * Now, we need to do 2 things:
         *  1. Reassign our new node's .next to be the current head of the list
         *  2. Reassign the list's .head to the newly created node
         */
        newHead.next = this.head;
        this.head = newHead;

        /**
         * The order of this is crucial, as assigning the head of the list to
         * the new node will essentially erase the rest of the list immediately.
         * 
         * If you wanted to reassign the head first, you'd need a second variable
         * to keep track of the current head
         */

        return this;
    }

    /**
     * Removes the first node of this list, and return the removed node.
     * - Time: O(1) - Constant, because the number of calculations does not change based on the size of the list
     * - Space: O(1) - Constant, because whether the list is 1 element long or 1000, we're still only creating 1 new item in memory.
     * @returns {any} The data from the removed node.
     */
    removeHead() {
        /**
         * Edge Case: What if the list is empty?
         * 
         * Well, if the list is empty, there's nothing to remove, so we'll return null,
         * as there can't be any data in a node that does not exist.
         */
        if(this.isEmpty()) {
            return null;
        }

        /**
         * Check that jsdoc! We're going to need to return the data in the removed node,
         * so let's go ahead and store the current head in a variable
         */
        const removedHead = this.head;
        
        // Now, we need to reassign the list's head to be the second node
        this.head = removedHead.next;

        /**
         * Pop Quiz: 
         * Q: If the singly linked list was only 1 element in length, will we run into any
         * trouble by doing what we just did?
         * 
         * A: Nope! If there is a second node, that second node will now be the head. If 
         * there is NOT a second node, then this.head will be null, which is what it should
         * be if you removed the first node in a list with only one node!
         */

        // Just to be safe, let's clear the removedHead's reference to other nodes:
        removedHead.next = null;

        // And finally, return that removed node's data
        return removedHead.data;

    }

    // EXTRA
    /**
     * Calculates the average of this list.
     * - Time: O(n) - Linear, with n = number of nodes in the list. This is because 
     *                the number of times the while loop runs is the number of nodes 
     *                in the list
     * - Space: O(1) - Constant, because no matter how long the list is, we're creating 
     *                 the same number of variables.
     * @returns {number|NaN} The average of the node's data.
     */
    average() {
        /**
         * It's time for some 3rd grade math!
         * To find the average of a set of numbers, we'll need to find the sum 
         * of those numbers, and divide it by how many numbers there were.
         * 
         * As such, let's make 2 variables
         */
        let sum = 0;
        let count = 0;

        // We'll also need a runner to check each node
        let runner = this.head;

        /**
         * Now, we need to send runner to stop at each and every node.
         * 
         * We don't want it to stop AT the last node, we want it to stop
         * AFTER evaluating the data of the last node. Therefore:
         */
        while(runner) {
            // We'll add the current node's data to our sum
            sum += runner.data;
            // And increment our count by 1
            count++;
            // Before moving runner to the next node
            runner = runner.next;
        }

        // Now, let's return the average!
        return sum / count;

        /**
         * NOTE: Dividing by 0 will give you NaN (Not a Number).
         * 
         * The only time this will happen is if the list is empty, as 
         * runner will not be able to count any nodes (as there are 
         * none). Typically this would be a problem. However, in this 
         * scenario, the average of no numbers doesn't make sense, so
         * NaN is a valid return!
         */
    }
}
