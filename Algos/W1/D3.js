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

    insertAtFront(data) {
        const newHead = new Node(data);
        newHead.next = this.head;
        this.head = newHead;
        return this;
    }

    removeHead() {
        if(this.isEmpty()) {
            return null;
        }

        const removedHead = this.head;
        
        this.head = removedHead.next;
        removedHead.next = null;
        return removedHead.data;

    }

    average() {
        let sum = 0;
        let count = 0;

        let runner = this.head;

        while(runner) {
            sum += runner.data;
            count++;
            runner = runner.next;
        }
        return sum / count;
    }

    /**
     * Removes the last node of this list.
     * - Time: O(n) - Linear, with n = length of the list.
     * - Space: O(1) - Constant, because the size of the list doesn't really 
     *                 impact how many new variables we create
     * @returns {any} The data from the node that was removed.
     */
    removeBack() {
        /**
         * Edge Cases:
         *  - What if the list is empty?
         *  - What if the list only contains one element?
         */
        if(this.isEmpty()) {
            // well then, there's nothing to remove, so return null
            return null;
        } else if(this.head.next == null) {
            /**
             * If the list only contains 1 node, we just want to set the head to null,
             * and return the data in what we just chopped off. So first, let's store that 
             * node in a variable
             */
            const removed = this.head;
            // Then, set the head to null
            this.head = null;
            // And return the removed node's data
            return removed.data;
        } else {
            // If neither edge case was met, we need to start our runner at the head
            let runner = this.head;
            /**
             * How can we make our runner stop at the second to last node? Well, we have 2 
             * main options:
             *  1. Continue to move the runner as long as the runner's next node has a next node
             *  2. Make a second runner that'll lag one behind ur main runner, and stop once runner
             *    is at the last node
             * 
             * Because I'll be needing to hold onto the last node's value for our return statement,
             * I'll use option two
             */
            let walker = null; // Starting this at null because there's nothing before the head of the list

            while(runner.next) {
                walker = runner; // Set walker to be the node runner is referencing before moving runner forward
                runner = runner.next;
            }

            /**
             * Once we've broken out of the while loop, it means that runner is
             * situated at the last node, and walker is at the second to last.
             * 
             * So we'll remove walker's reference to runner (set .next to null)
             * and return runner's data
            */
            walker.next = null;
            return runner.data;
        }
        
    }

    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n) - Linear, where n = length of the list.
     * - Space: O(1) - Constant, because the length of the list doesn't impact how much memory used
     * @param {any} val The data to search for in the nodes of this list.
     * @returns {boolean}
     */
    contains(val) {
        /**
         * The basics involved here are pretty simple:
         * Check every single node and see if its data matches our search value
         */
        let runner = this.head;

        while(runner) {
            // If we found our value, we don't need to check any other nodes, so we can just return true
            if(runner.data == val) return true;
            // Reaching this line means the runner's data didn't match, so move runner to the next node
            runner = runner.next;
        }

        // Reaching the end here means we never found our value, so it must not exist
        return false;
    }
    
    // EXTRA
    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n) - Linear, where n = length of the list.
     * - Space: O(n) - Linear, where n = length of the list. This one is a bit more complicated,
     *                 because we can see that there are no actual declared variables. However,
     *                 when using recursion, each new function call results in a new function added
     *                 to the call stack, with its parameters being given their own space in memory.
     *                 therefore, the longer the list, the more functions added to the stack, and in 
     *                 turn, the more variables added to memory (2 per function call, as per the 
     *                 parameters)
     * @param {any} val The data to search for in the nodes of this list.
     * @param {?node} current The current node during the traversal of this list
     *    or null when the end of the list has been reached.
     * @returns {boolean}
     */
    containsRecursive(val, current = this.head) {
        /**
         * BASE CASE: If current is null, the list doesn't contain the value.
         * Either the head was null to begin with, or we reached the end. period.
         */
        if(current == null) {
            return false;
        } else if(current.data == val) {
            /**
             * If current DOES match our search value, then we found it! and we return true!
             */
            return true;
        } else {
            /**
             * Now, the previous 2 checks, on their own, will only cover the first node (or lack 
             * thereof). We want to perform this search recursively, so that means we need to
             * call this same method (it's like inception but for functions).
             * 
             * But, the second parameter, current, needs to be set to the next node.
             * 
             * Lastly, we also want to return whatever comes back from that dream dive, so:
             */
            return this.containsRecursive(val, current.next);
        }
    }

    /**
     * Recursively finds the maximum integer data of the nodes in this list.
     * - Time: O(n) - Linear, where n = list's length.
     * - Space: O(n) - Linear, where n = list's length. Same deal as before. 
     * @param {Node} runner The start or current node during traversal, or null
     *    when the end of the list is reached.
     * @param {Node} maxNode Keeps track of the node that contains the current
     *    max integer as it's data.
     * @returns {?number} The max int or null if none.
     */
    recursiveMax(runner = this.head, maxNode = this.head) {
        // BASE CASE: runner has reached null
        if(runner == null) {
            // EDGE CASE: if runner is null because the list is empty
            if(maxNode == null) {
                // return null
                return null;
            } else {
                // otherwise, it reached null because it reached the end, so return maxNode's data
                return maxNode.data
            }
        }

        /**
         * If we haven't fallen into our base case, then we need to check if the runner's data
         * is larger than our maxNode's data
         */
        if(runner.data > maxNode.data) {
            // if it is, set maxNode to be the runner
            maxNode = runner;
        }

        /**
         * RECURSIVE CALL:
         * We've checked our node's value against our maxNode, so it's on
         * to the next! Recursively!
         * 
         * Dive deeper into our function-ception, where the next call's runner
         * will be this call's runner's next, and maxNode is whatever maxNode is
         * at this point
         */
        return this.recursiveMax(runner.next, maxNode);
    }

}
