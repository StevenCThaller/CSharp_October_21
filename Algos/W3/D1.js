/**
 * Class to represent a Node in a Binary Search Tree (BST).
 */
class Node {
    /**
     * Constructs a new instance of a BST node.
     * @param {number} data The integer to store in the node.
     */
    constructor(data) {
        this.data = data;
        /**
         * These properties are how this node is connected to other nodes to form
         * the tree. Similar to .next in a SinglyLinkedList except a BST node can
         * be connected to two other nodes. To start, new nodes will not be
         * connected to any other nodes, these properties will be set after
         * the new node is instantiated.
         */
        this.left = null;
        this.right = null;
    }
}

/**
 * Represents an ordered tree of nodes where the data of left nodes are <= to
 * their parent and the data of nodes to the right are > their parent's data.
 */
class BinarySearchTree {
    constructor() {
        /**
         * Just like the head of a linked list, this is the start of our tree which
         * branches downward from here.
         */
        this.root = null;
    }

    print(toPrint = "", runner = this.root) {
        if(runner == null) {
            return this;
        }

        toPrint += "\t";
        this.print(toPrint, runner.right);
        console.log(`${toPrint}${runner.data}`);
        this.print(toPrint, runner.left);
    }


    /**
     * Determines if this tree is empty.
     * - Time: O(1) - Constant.
     * - Space: O(1) - Constant.
     * @returns {boolean} Indicates if this tree is empty.
     */
    isEmpty() { 
        return this.root === null;
    }

    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(n) - Linear, where n = the height of the left sub-tree starting from the current node.
     * - Space: O(1) - Constant.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The smallest integer from this tree, or null if empty.
     */
    min(current = this.root) { 
        // EDGE CASE! What if the tree is empty?
        if(this.isEmpty()) {
            return null;
        }

        /*
            To find the smallest data, we just need to keep going 
            to the left. Just like with SLL's, if the next thing is
            null, we've reached the end. Only instead of next, we'll
            use left!
        */
        while(current.left) {
            current = current.left;
        }

        // Return the current node's data!
        return current.data;
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(n) - Linear, where n = the height of the right subtree, starting from the current node.
     * - Space: O(1) - Constant.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The largest integer from this tree, or null if empty
     */
    max(current = this.root) { 
        // Let's do all the same things as min, but replace left with right!
        if(this.isEmpty()) {
            return null;
        }

        while(current.right) {
            current = current.right;
        }

        return current.data;
    }

    // BONUS
    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(n) - Linear, where n is the height of the left subtree.
     * - Space: O(n) - Linear, where n is the height of the left subtree. 
     *                 Remember, just because we're not explicitly declaring
     *                 new variables doesn't mean that each recursive call is not adding
     *                 a new layer to the call stack, each with its own new current.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number|null} The smallest integer from this tree, or null if empty.
     */
    minRecursive(current = this.root) { 
        if(current == null) {
            return;
        } else if(current.left == null) {
            return current.data;
        }

        return this.minRecursive(current.left);
    }

    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(n) - Linear, where n is the height of the left subtree.
     * - Space: O(n) - Linear, where n is the height of the left subtree. 
     *                 Remember, just because we're not explicitly declaring
     *                 new variables doesn't mean that each recursive call is not adding
     *                 a new layer to the call stack, each with its own new current.
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number} The largest integer from this tree.
     */
    maxRecursive(current = this.root) {
        // Same thing but right!
        if(current == null) {
            return;
        } else if(current.right == null) {
            return current.data;
        }

        return this.maxRecursive(current.right);

    }

}

const emptyTree = new BinarySearchTree();
const oneNodeTree = new BinarySearchTree();
oneNodeTree.root = new Node(10);

/**  twoLevelTree
 *      root
 *       10
 *      /  \
 *     5    15
 */
const twoLevelTree = new BinarySearchTree();
twoLevelTree.root = new Node(10);
twoLevelTree.root.left = new Node(5);
twoLevelTree.root.right = new Node(15);
twoLevelTree.print();

