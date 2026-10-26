/**
 * Portfolio Functional Script Layer
 * Accessible Dynamic Chat Assistant (WCAG 2.2 AAA & 4.1.3 Compliant)
 * Handles input capture, live region streaming, and keyboard navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // DOM Elements
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatLog = document.getElementById('chat-log');

  if (!chatToggle || !chatWindow || !chatForm || !chatInput || !chatLog) {
    return;
  }

  /**
   * Toggles the visibility of the chat interface.
   * Maintains accurate ARIA state and ensures focus is never trapped.
   * @param {boolean} [shouldOpen]
   */
  const toggleChat = (shouldOpen) => {
    const currentState = chatToggle.getAttribute('aria-expanded') === 'true';
    const nextState = shouldOpen !== undefined ? shouldOpen : !currentState;

    chatToggle.setAttribute('aria-expanded', String(nextState));

    if (nextState) {
      chatWindow.removeAttribute('hidden');
      chatInput.focus();
    } else {
      chatWindow.setAttribute('hidden', '');
      chatToggle.focus();
    }
  };

  /**
   * Appends a message bubble into the accessible polite live region.
   * @param {string} text - Message payload to render.
   * @param {'user' | 'bot'} sender - Author of the message.
   */
  const appendMessage = (text, sender) => {
    const bubble = document.createElement('p');
    bubble.classList.add('chat-bubble');
    bubble.classList.add(sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot');
    bubble.textContent = text;

    chatLog.appendChild(bubble);

    // Keep the live scroll focused on the latest message
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  /**
   * Handles user submission, captures input, and coordinates responses.
   * @param {SubmitEvent} event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const query = chatInput.value.trim();
    if (!query) {
      return;
    }

    // 1. Output the user message to the live region
    appendMessage(query, 'user');
    chatForm.reset();

    // 2. Simulate assistant response hook (Ready for API integration)
    window.setTimeout(() => {
      const response = `Thank you for asking about "${query}". You can review full API schemas, SDK tutorials, and architectural runbooks in the case study cards above.`;
      appendMessage(response, 'bot');
    }, 400);
  };

  // Event Listeners — allows toggle button to both open and close cleanly
  chatToggle.addEventListener('click', () => toggleChat());
  
  if (chatClose) {
    chatClose.addEventListener('click', () => toggleChat(false));
  }

  chatForm.addEventListener('submit', handleFormSubmit);

  // Close widget gracefully on ESC key without breaking native tab order
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !chatWindow.hasAttribute('hidden')) {
      toggleChat(false);
    }
  });
});