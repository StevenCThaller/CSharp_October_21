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

    removeBack() {
        if(this.isEmpty()) {
            return null;
        } else if(this.head.next == null) {
            const removed = this.head;
            this.head = null;
            return removed.data;
        } else {
            let runner = this.head;
            let walker = null;
            while(runner.next) {
                walker = runner;
                runner = runner.next;
            }
            walker.next = null;
            return runner.data;
        }
        
    }

    contains(val) {
        let runner = this.head;

        while(runner) {
            if(runner.data == val) return true;
            runner = runner.next;
        }
        return false;
    }

    containsRecursive(val, current = this.head) {
        if(current == null) {
            return false;
        } else if(current.data == val) {
            return true;
        } else {
            return this.containsRecursive(val, current.next);
        }
    }

    recursiveMax(runner = this.head, maxNode = this.head) {
        if(runner == null) {
            if(maxNode == null) {
                return null;
            } else {
                return maxNode.data
            }
        }
        if(runner.data > maxNode.data) {
            maxNode = runner;
        }
        return this.recursiveMax(runner.next, maxNode);
    }

    /**
     * Retrieves the data of the second to last node in this list.
     * - Time: O(n) - Linear, where n = the length of the list.
     * - Space: O(1) - Constant, because regardless of the size of the list, we're
     *                 making the same number of variables.
     * @returns {any} The data of the second to last node or null if there is no
     *    second to last node.
     */
    secondToLast() {
        /**
         * Edge Cases:
         *  - What if there is no second to last node?
         *  - Kind of an extension of the first, but what if there's no last node? 
         */
        if(this.isEmpty() || this.head.next == null) {
            return null;
        }

        /**
         * We need to get to the second to last node. In removeBack, we used 2 
         * variables, but that was because we needed to get to the second to last 
         * node, but also keep data from the last node.
         * 
         * This time, we don't care much about the last node, other than the fact
         * that it exists. So we'll just use a runner, and the while loop will check
         * for runner.next.next
         */
        let runner = this.head;

        while(runner.next.next) {
            runner = runner.next;
        }

        // At this point, runner is at the second to last node, so we'll return the data
        return runner.data;
    }

    /**
     * Removes the node that has the matching given val as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value to compare to the node's data to find the
     *    node to be removed.
     * @returns {boolean} Indicates if a node was removed or not.
     */
    removeVal(val) {
        /**
         * Edge Cases:
         *  1. If the list is empty
         *  2. If the value we want to remove is the head
         */

        // 1. Empty
        if(this.isEmpty()) {
            // well, then there's nothing to remove!
            return false;
        }

        // 2. If the value we want to remove is the head:
        else if(this.head.data === val) {
            // Wait... we've already done this!
            this.removeHead();
            return true;
        }

        /**
         * Now that that's out of the way, let's get to the good bits.
         * 
         * We'll need to keep track of 2 nodes. We can do this with 2 variables,
         * or 1 variable with a disgusting amount of .next work. I don't like that, 
         * so I'll just use 2 variables: a runner and walker
         */
        let walker = this.head; // because we've already checked the first node
        let runner = walker.next; // so our runner starts at the second node

        // We want to check every single node
        while(runner) {
            // check runner's data
            if(runner.data === val) {
                /**
                 * If the runner has the value we're looking to remove, what do?
                 * 
                 * 1. Set walker's next to runner's next
                 * 2. ??
                 * 3. Profit
                 */
                walker.next = runner.next;
                // Bonus: Remove runner's reference to anything
                runner.next = null;
                return true;
            }
            // no match? move along.
            walker = runner;
            runner = runner.next;
        }

        // Finished the loop? The node must not exist :(
        return false;
    }

    // EXTRA
    /**
     * Inserts a new node before a node that has the given value as its data.
     * - Time: O(n) - Linear, where n = the length of the list
     * - Space: O(1) - Constant, because no matter the size of the list, we make the same 
     *                 amount of variables.
     * @param {any} newVal The value to use for the new node that is being added.
     * @param {any} targetVal The value to use to find the node that the newVal
     *    should be inserted in front of.
     * @returns {boolean} To indicate whether the node was pre-pended or not.
     */
    prepend(newVal, targetVal) {
        /**
         * Edge Cases:
         *  1. Empty list
         *  2. Target is the head
         *  2. No node with the target val (can't be handled up front)
         */
        if(this.isEmpty()) {
            return false;
        } else if(this.head.data === targetVal) {
            // So our target is the head? Sound like we're inserting at front!
            this.insertAtFront(newVal);
            return true;
        }

        // We'll use a 2 runner approach
        let walker = null;
        let runner = this.head;

        // We need to check every single node, so
        while(runner) {
            // Now, let's see if we found our targetVal
            if(runner.data === targetVal){
                // If we did find it, we need to create our new node
                const newNode = new Node(newVal);
                // Assign its .next to the runner
                newNode.next = runner;

                // But now we need to take the previous node and connect it
                // to our new node
                walker.next = newNode;
                // And voila!
                return true;
            }
            // Not a match? Let's move on.
            walker = runner;
            runner = runner.next;
        }

        // Made it here without finding our targetVal? Sounds like there's nothing to prepend to
        return false;
    }

}
