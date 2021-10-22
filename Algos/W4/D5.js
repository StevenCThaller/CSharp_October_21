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
        if (minNode === this.head) {
            return this;
        }

        runner = this.head;

        while (runner !== minNode) {
            prev = runner;
            runner = runner.next;
        }

        prev.next = minNode.next;
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
    reverse() { 
        if(this.isEmpty()) {
            return this;
        }
        let prevNode = null;
        let runner = this.head;
        let nextNode = runner.next;

        while(runner.next) {
            runner.next = prevNode;
            prevNode = runner;
            runner = nextNode;
            nextNode = nextNode.next;
        }

        runner.next = prevNode;
        this.head = runner;

        return this;
    }

    reverseRecursive(runner = this.head, prevNode = null) { 
        if(!runner){
            this.head = prevNode;
            return this;
        } 

        this.reverseRecursive(runner.next, runner);
        runner.next = prevNode;
        return this;
    }

    hasLoop() { 
        if(this.isEmpty() || !this.head.next) {
            return false;
        }

        let normalRunner = this.head;
        let fasterRunner = this.head.next;

        while(fasterRunner.next) {
            if(normalRunner == fasterRunner) {
                return true;
            }

            normalRunner = normalRunner.next;
            fasterRunner = fasterRunner.next.next;
        }

        return false;
    }

    removeNegatives() { 
        if(this.isEmpty()){
            return this;
        }
        
        while(this.head && this.head.data < 0) {
            const temp = this.head;
            this.head = this.head.next;
            temp.next = null;
        }
        
        let prevNode = this.head;
        let runner = prevNode.next;

        while(runner){
            if(runner.data < 0) {
                prevNode.next = runner.next;
                runner.next = null;
                runner = prevNode.next;
            } else {
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

    /**
     * Breaks a loop in a Singly Linked List
     * - Time: O(n)
     * - Space: O(1)
     * @returns {SinglyLinkedList} The list after breaking the loop
     */
    breakLoop(){
        /* 
            I'm going to use the same base logic to FIND the loop.

            Only instead of returning right away, I'm going to stop the initial loop.
        */
        if(this.isEmpty() || !this.head.next) {
            return this;
        }

        let normalRunner = this.head;
        let fasterRunner = this.head.next;

        // This will help us determine whether to actually break a loop or to just quit because it's not a loop.
        let isLoop = false;

        while(fasterRunner.next) {
            if(normalRunner == fasterRunner) {
                isLoop = true;
                // Break the loop instead of returning
                break;
            }

            normalRunner = normalRunner.next;
            fasterRunner = fasterRunner.next.next;
        }

        if(!isLoop) return this;

        /*
            Now that we've found that a loop exists, here's what we're going to do:
            1. Leave one runner where it is
            2. Set the second runner to the first node
            3. Step both forward 1 at a time
            4. When the runner that was left back in the loop sees the other runner as its .next,
                that first runner's .next needs to be set to null, because that's where the loop needs
                to end
        */

        normalRunner = this.head;

        while(fasterRunner.next != normalRunner) {
            normalRunner = normalRunner.next;
            fasterRunner = fasterRunner.next;
        }

        fasterRunner.next = null;
        return this;
    }
}


const myList = new SinglyLinkedList();


myList
    .insertAtBack(8)
    .insertAtBack(6)
    .insertAtBack(7)
    .insertAtBack(5)
    .insertAtBack(3)
    .insertAtBack(0)
    .insertAtBack(9);

const lastNode = myList.head.next.next.next.next.next.next;

lastNode.next = myList.head.next.next.next;

myList.breakLoop();
myList.printList();