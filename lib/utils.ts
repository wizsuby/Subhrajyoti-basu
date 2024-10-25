export function simulateTyping(element: HTMLElement, text: string, index: number = 0): void {
    element.focus();

    // Create a range and set the selection
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    selection?.removeAllRanges();
    selection?.addRange(range);

    // Loop through each character in the text
    for (let char of text) {
        // Create and dispatch a keydown event
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: char,
            code: `Key${char.toUpperCase()}`,
            charCode: char.charCodeAt(0),
            keyCode: char.charCodeAt(0),
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(keyDownEvent);

        // Insert the character into the content-editable div
        document.execCommand('insertText', false, char);

        // Create and dispatch a keyup event
        const keyUpEvent = new KeyboardEvent('keyup', {
            key: char,
            code: `Key${char.toUpperCase()}`,
            charCode: char.charCodeAt(0),
            keyCode: char.charCodeAt(0),
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(keyUpEvent);
    }
}