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
        if (this.isEmpty()) {
            this.head = newNode;
            return this;
        }
        let runner = this.head;
        while (runner.next) {
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
        if (this.isEmpty()) {
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

        while (runner) {
            sum += runner.data;
            count++;
            runner = runner.next;
        }
        return sum / count;
    }

    removeBack() {
        if (this.isEmpty()) {
            return null;
        } else if (this.head.next == null) {
            const removed = this.head;
            this.head = null;
            return removed.data;
        } else {
            let runner = this.head;
            let walker = null;
            while (runner.next) {
                walker = runner;
                runner = runner.next;
            }
            walker.next = null;
            return runner.data;
        }

    }

    contains(val) {
        let runner = this.head;

        while (runner) {
            if (runner.data == val) return true;
            runner = runner.next;
        }
        return false;
    }

    containsRecursive(val, current = this.head) {
        if (current == null) {
            return false;
        } else if (current.data == val) {
            return true;
        } else {
            return this.containsRecursive(val, current.next);
        }
    }

    recursiveMax(runner = this.head, maxNode = this.head) {
        if (runner == null) {
            if (maxNode == null) {
                return null;
            } else {
                return maxNode.data
            }
        }
        if (runner.data > maxNode.data) {
            maxNode = runner;
        }
        return this.recursiveMax(runner.next, maxNode);
    }

    secondToLast() {
        if (this.isEmpty() || this.head.next == null) {
            return null;
        }
        let runner = this.head;

        while (runner.next.next) {
            runner = runner.next;
        }
        return runner.data;
    }
    removeVal(val) {
        if (this.isEmpty()) {
            return false;
        }
        else if (this.head.data === val) {
            this.removeHead();
            return true;
        }

        let walker = this.head;
        let runner = walker.next;

        while (runner) {
            if (runner.data === val) {
                walker.next = runner.next;
                runner.next = null;
                return true;
            }
            walker = runner;
            runner = runner.next;
        }

        return false;
    }

    prepend(newVal, targetVal) {
        if (this.isEmpty()) {
            return false;
        } else if (this.head.data === targetVal) {
            this.insertAtFront(newVal);
            return true;
        }

        let walker = null;
        let runner = this.head;

        while (runner) {
            if (runner.data === targetVal) {
                const newNode = new Node(newVal);
                newNode.next = runner;
                walker.next = newNode;
                return true;
            }
            walker = runner;
            runner = runner.next;
        }

        return false;
    }

    concat(addList) {
        let runner = this.head;

        if (runner === null) {
            this.head = addList.head;
        } else {
            while (runner.next) {
                runner = runner.next;
            }
            runner.next = addList.head;
        }
        return this;
    }

    moveMinFront() {
        /* 
            Alternatively, we could swap the data only in min node and head,
            but it's better to swap the nodes themselves in case anyone has variables
            pointing to these nodes already so that we don't unexpectedly change the
            the data in those nodes potentially causing unwanted side-effects.
        */
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;

        while (runner) {
            if (runner.data < minNode.data) {
                minNode = runner;
            }

            runner = runner.next;
        }
        // now that we know the min, if it is already the head, nothing needs to be done
        if (minNode === this.head) {
            return this;
        }

        runner = this.head;

        while (runner !== minNode) {
            prev = runner;
            runner = runner.next;
        }

        prev.next = minNode.next; // remove the minNode
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    moveMinToFront() {
        if (this.isEmpty()) {
            return this;
        }

        let minNode = this.head;
        let runner = this.head;
        let prev = this.head;


        while (runner.next) {
            if (runner.next.data < minNode.data) {
                prev = runner;
                minNode = runner.next;
            }

            runner = runner.next;
        }

        if (minNode === this.head) {
            return this;
        }

        prev.next = minNode.next;
        minNode.next = this.head;
        this.head = minNode;
        return this;
    }

    splitOnVal(val) {
        const newList = new SinglyLinkedList();

        if (!this.head) {
            return newList;
        }

        if (this.head.data === val) {
            newList.head = this.head;
            this.head = null;
            return newList;
        }

        let runner = this.head;

        while (runner.next) {
            if (runner.next.data === val) {
                newList.head = runner.next;
                runner.next = null;
                return newList;
            }
            runner = runner.next;
        }
        return newList;
    }

    /**
     * Reverses this list in-place without using any extra lists.
     * - Time: (n) - Linear, where n is the number of elements in the list.
     * - Space: (1) - Constant, because even though we have 3 whole variables,
     *                there will only ever be those.
     * @returns {SinglyLinkedList} This list.
     */
    reverse() { 
        // EDGE CASE: Empty list
        if(this.isEmpty()) {
            return this; // nothing to reverse
        }
        /*
            We'll need 3 pointers:
                1. prevNode
                2. currNode (runner)
                3. nextNode

            Because in order to "reverse", we need to take the current node (runner)'s .next,
            and reassign it to the previous node. But the previous node is behind, so we need 
            another variable pointing at that. But once we reassign runner's .next away from
            the nextNode, we lose access to the node that runner needs to move to next
        */
        let prevNode = null;
        let runner = this.head;
        let nextNode = runner.next;

        /*
            Then, we want to traverse through the whole list

            But, we'll stop when runner is at the last node, because we have something
            special to do there.
        */
        while(runner.next) {
            // Assign runner's .next to prevNode
            runner.next = prevNode;
            // Then, move prevNode to the current node (runner)
            prevNode = runner;
            // And runner to the next node
            runner = nextNode;
            // And finally, nextNode to the node AFTER that.
            nextNode = nextNode.next;
        }

        /*
            Once runner is stopped at the last node, we need to reassign its
            .next one last time, but then, set the head to runner
        */
        runner.next = prevNode;
        this.head = runner;

        // And return the list!
        return this;
    }

    /**
     * Recursively reverses this list in-place without using any extra lists.
     * - Time: (n) - Linear, where n is the number of elements in the list.
     * - Space: (n) - Linear, where n is the depth of the call stack
     * @returns {SinglyLinkedList} This list.
     */
    reverseRecursive(runner = this.head, prevNode = null) { 
        /*
            The best way to think about this is you need to turn a sock inside out.

            You reach all the way to the end, THEN start pulling things back.
        */
        if(!runner){
            this.head = prevNode;
            return this;
        } 

        this.reverseRecursive(runner.next, runner);
        runner.next = prevNode;
        return this;
    }

    /**
     * Determines whether the list has a loop in it which would result in
     * infinitely traversing unless otherwise avoided. A loop is when a node's
     * next points to a node that is behind it.
     * - Time: (n) - Linear, where n = the length of the list. The longer the list,
     *               the longer this will take, with a linear relation.
     * - Space: (1) - Constant, because no matter how long the list, the amount of memory used
     *                won't change.
     * @returns {boolean} Whether the list has a loop or not.
     */
    hasLoop() { 
        /*
            Remember our clip at the beginning: 2 runners, with one running faster.

            Because Steve runs faster than Sam, and they are on a closed track
            (i.e. one that loops, cough cough), eventually, Steve will pass Sam again.

            So we'll take that idea, and use 2 runners:
            one will move one node at a time,
            the other will move 2 nodes at a time.

            If the faster one ever finds the slower one, there's a loop!
        */

        /*
            EDGE CASES:
                1. Empty? Obviously not a loop
                2. Only one node? Also obviously not a loop. But this is more important
                    in how we'll be needing 2 runners, with one starting ahead of the other.
        */
        if(this.isEmpty() || !this.head.next) {
            return false;
        }

        let normalRunner = this.head;
        let fasterRunner = this.head.next;

        while(fasterRunner.next) {
            /* 
                Considering our fasterRunner starts ahead of normalRunner,
                if we find normalRunner and fasterRunner pointing at the same node, 
                then we've found a loop.
            */
            if(normalRunner == fasterRunner) {
                return true;
            }

            // Move them both up the correct number of times.
            normalRunner = normalRunner.next;
            fasterRunner = fasterRunner.next.next;
        }

        /*
            If we ever exit the while loop, then obviously there's no loop, because
            fasterRunner had a next of null
        */
        return false;
    }

    /**
     * Removes all the nodes that have a negative integer as their data.
     * - Time: (n) - Linear, where n is the length of the list.
     * - Space: (1) - Constant, because the amount of memory used doesn't change with a longer list.
     * @returns {SinglyLinkedList} This list after the negatives are removed.
     */
    removeNegatives() { 
        // EDGE CASE: EMTPY?! 
        if(this.isEmpty()){
            return this;
        }
        
        // Edge Case 2 and 3: All Negatives (also multiple consecutive negatives to start)
        while(this.head && this.head.data < 0) {
            const temp = this.head;
            this.head = this.head.next;
            temp.next = null;
        }
        
        /*
            At this point, we know that the head is positive.

            To remove a node, we assign its previous node's .next 
            to the node to be removed's .next. We'll use runner
            as the node for checking if negative, and prevNode to
            keep track of the previous node
        */
       let prevNode = this.head;
       let runner = prevNode.next;

        while(runner){
            /*
                To handle multiple consecutive negatives, we need to handle
                our 2 cases slightly differently (aside from removing a node in one
                case, and not removing one in the other).

                If we find a negative, we don't want to move prevNode. Why?
                Imagine the following:

                H: 5 -> -3 -> -9 -> 4 -> 1 ->

                With prevNode at 5, and runner at -3, if we removed -3, we'd have the following:
                
                H: 5 -> -9 -> 4 -> 1 ->

                with prevNode still at 5 and runner at -9. If we were to assume that removing a node
                meant we will automatically move forward, in the next iteration, prevNode would be at 
                -9, and runner would be at 4.

                Because we're using runner to check for the negative, and removing a negative node requires
                the previous node, runner's previous would STILL be prevNode from the previous iteration.

                So:
            */
            if(runner.data < 0) {
                prevNode.next = runner.next;
                runner.next = null;
                // If we remove a node, ONLY move runner
                runner = prevNode.next;
            } else {
                // otherwise, move both runner AND prevNode
                prevNode = runner;
                runner = runner.next;
            }
        }

        return this;
    }

    printList(){
        let str = "H: ";
        if(this.isEmpty()) {
            return str + "null";
        }

        let runner = this.head;
        while(runner) {
            str += runner.data + " -> ";
            runner = runner.next;
        }
        console.log(str);
    }
}


const myList = new SinglyLinkedList();
