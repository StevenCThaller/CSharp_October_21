/**
 * Class to represents a single item of a SinglyLinkedList that can be
 * linked to other Node instances to form a list of linked nodes.
 */
class Node {
    /**
     * Constructs a new Node instance. Executed when the 'new' keyword is used.
     * @param {any} data The data to be added into this new instance of a Node.
     *    The data can be anything, just like an array can contain strings,
     *    numbers, objects, etc.
     * @returns {Node} A new Node instance is returned automatically without
     *    having to be explicitly written (implicit return).
     */
    constructor(data) {
        this.data = data;
        /**
         * This property is used to link this node to whichever node is next
         * in the list. By default, this new node is not linked to any other
         * nodes, so the setting / updating of this property will happen sometime
         * after this node is created.
         */
        this.next = null;
    }
}

/**
 * Class to represent a list of linked nodes. Nodes CAN be linked together
 * without this class to form a linked list, but this class helps by providing
 * a place to keep track of the start node (head) of the list at all times and
 * as a place to add methods (functions inside an object) so that every new
 * linked list that is instantiated will inherit helpful the same helpful
 * methods, just like every array you create inherits helpful methods.
 */
class SinglyLinkedList {
    /**
     * Constructs a new instance of an empty linked list that inherits all the
     * methods.
     * @returns {SinglyLinkedList} The new list that is instantiated is implicitly
     *    returned without having to explicitly write "return".
     */
    constructor() {
        this.head = null;
    }

    /**
     * Calls insertAtBack on each item of the given array.
     * - Time: O(n * m) n = list length, m = arr.length.
     * - Space: O(1) constant.
     * @param {Array<any>} vals The data for each new node.
     * @returns {SinglyLinkedList} This list.
     */
    seedFromArr(vals) {
        for (const item of vals) {
            this.insertAtBack(item);
        }
        return this;
    }

    /**
     * Converts this list into an array containing the data of each node.
     * - Time: O(n) linear.
     * - Space: O(n).
     * @returns {Array<any>} An array of each node's data.
     */
    toArr() {
        const arr = [];
        let runner = this.head;

        while (runner) {
            arr.push(runner.data);
            runner = runner.next;
        }
        return arr;
    }


    /**
     * Determines if this list is empty.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {boolean}
     */
    isEmpty() {
        // Remember, a singly linked list is empty if the head is null, so:
        // - If the head is null return true
        // - If the head is not null, return false

        // This can be whittled down to a single line: Return the condition itself
        return this.head == null;
    }

    /**
     * Creates a new node with the given data and inserts it at the back of
     * this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} data The data to be added to the new node.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtBack(data) {
        // One way or another, we're going to need our new node:
        const newNode = new Node(data);
        
        /**
         * We have a pretty significant edge case here:
         * If the list is empty, we can't get to the "last node". 
         * To handle this, if the list is empty, we simply want to set the new
         * node to be the head
        */
        if(this.isEmpty()) {
            this.head = newNode;
            /**
             * I like to return this in most of my Singly Linked List methods
             * because it allows me to chain methods.
             */
            return this;
        }

        
        // Well, if the list ISN'T empty, we need to start our runner at the head of the list
        let runner = this.head;

        /**
         * Now, if we use while(runner), eventually our runner will reach the last
         * node, enter the while loop, and finish by setting runner to the last node's
         * .next, which will be null. But at that point, we don't have a way to go back
         * to the last node, unless we start over.
         * 
         * So, what we should do is use while(runner.next), because if the runner has a 
         * .next, we want to move runner to it. If the runner does NOT have a .next, then
         * runner is the last node in our list, which is where we want to stop and add
         * the new node
         */
        while(runner.next) {
            runner = runner.next;
        }

        /**
         * Now that runner is sitting at our last node and we have broken out of the while loop,
         * we want to add the newNode to the end. To do so, we simply set runner's .next to
         * newNode, and voila!
         */

        runner.next = newNode;
        return this;
        
    }
}

// To create the singly linked list
const ourFirstSinglyLinkedList = new SinglyLinkedList().seedFromArr([
    -5, -10, 4, -3, 6, 1, -7, -2,
]);

// EXPECTED: Running ourFirstSinglyLinkedList.toArr() should give us:
// [-5, -10, 4, -3, 6, 1, -7, -2]



const anotherTest = new SinglyLinkedList();
anotherTest.insertAtBack(7);
// EXPECTED: Running anotherTest.toArr() should give us:
// [7]
console.log(anotherTest.toArr());


// ALSO: Both of the above lists, when .isEmpty() is run, should return false

const emptyList = new SinglyLinkedList();
console.log(emptyList.isEmpty()); // should return true