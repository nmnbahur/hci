# Project Documentation: Page 1

## Title of Web Page
**AccessAbility | HCI Learning Platform**

## Objective
To design and develop a responsive web page accessible using five (5) interaction modes, and to apply Ben Shneiderman’s 8 Golden Rules of Interface Design in the system.

## Target Users
- Students learning about Human-Computer Interaction.
- Web developers looking for multi-modal accessibility patterns.
- Users with different interaction needs (Voice, Keyboard-only, etc.).

## Explanation of 5 Interaction Modes

### 1. Keyboard Interaction
- **Tab Navigation**: All interactive elements (links, cards) are accessible via `Tab`.
- **Shortcuts**: `Ctrl + H` navigates instantly to the Home section.
- **Enter Key**: used for selecting module cards and submitting the form.

### 2. Mouse Interaction
- **Click Events**: Clean ripple-style feedback on clicks.
- **Hover Effects**: Interactive cards lift and glow on hover to signal interactivity.
![Mouse Hover Effect](./docs/hover_effect.png)

### 3. Touch Interaction
- **Mobile Responsive**: Flexbox and Grid layouts ensure content stacks correctly on small screens.
- **Touch-Friendly**: Buttons and cards have a minimum hit area of 44x44px.
- **Visual Ripple**: Visual "touch ripples" appear on mobile taps for instant feedback.

### 4. Voice Interaction
- **Web Speech API**: Uses browser-native speech recognition.
- **Commands**: 
  - "Open Home" / "Go to Home"
  - "Open Courses"
  - "Submit Form" / "Submit"
  - "Open Contact"

### 5. Visual / Graphical Interaction
- **Icons**: Intuitive iconography for all modules (Keyboard, Touch, Voice).
- **Feedback Messages**: Toast notifications appear for every significant action.
- **Animations**: CSS transitions for smooth section navigation and button states.
![Visual Feedback Example](./docs/submission_feedback.png)
