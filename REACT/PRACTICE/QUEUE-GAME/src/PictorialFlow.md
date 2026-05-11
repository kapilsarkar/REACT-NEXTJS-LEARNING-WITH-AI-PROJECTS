# Queue Management App — React Data Flow

---

## 1. Full Application Structure

```text
                    ┌─────────────────────┐
                    │      App.jsx        │
                    │─────────────────────│
                    │ queue state lives   │
                    │ useState([])        │
                    └─────────┬───────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              │ props                         │ props
              ▼                               ▼

    ┌────────────────────┐      ┌────────────────────────┐
    │   QueueForm.jsx    │      │   QueueDisplay.jsx     │
    │────────────────────│      │────────────────────────│
    │ Takes user input   │      │ Displays queue data    │
    │ Sends data upward  │      │ Receives queue props   │
    └────────────────────┘      └────────────────────────┘
```

---

## 2. How Data Flows

```text
 USER TYPES DATA
        │
        ▼

┌────────────────────┐
│   QueueForm.jsx    │
│────────────────────│
│ name state         │
│ service state      │
└─────────┬──────────┘
          │
          │ onAdd({ name, service })
          ▼

┌────────────────────┐
│      App.jsx       │
│────────────────────│
│ addToQueue()       │
│ setQueue()         │
└─────────┬──────────┘
          │
          │ Updated queue state
          ▼

┌────────────────────┐
│ QueueDisplay.jsx   │
│────────────────────│
│ queue.map()        │
│ displays customers │
└────────────────────┘
```

---

## 3. Step-by-Step React Flow

## STEP 1 — User Enters Data

```js
Name = "Kapil"
Service = "Consultation"
```

Inside:

```js
QueueForm.jsx
```

---

## STEP 2 — Form Submission

When user clicks Submit:

```js
onAdd({ name, service })
```

runs.

---

## STEP 3 — Parent Function Executes

`onAdd()` calls:

```js
addToQueue(customer)
```

inside:

```js
App.jsx
```

---

## STEP 4 — React State Updates

```js
setQueue([
  ...prevQueue,
  newCustomer
])
```

React stores the updated queue.

---

## STEP 5 — React Re-renders UI

Updated `queue` state is passed to:

```js
QueueDisplay.jsx
```

through props.

---

## STEP 6 — QueueDisplay Renders Data

```js
queue.map()
```

loops through all customers and displays them.

---

## 4. Important React Concept

### Lifting State Up

The shared state lives inside:

```js
App.jsx
```

because both components need access.

```text
QueueForm.jsx     → sends data
QueueDisplay.jsx  → receives data
```

So the parent component controls the shared state.

---

## 5. Final React Architecture

```text
                    App.jsx
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼

   QueueForm.jsx             QueueDisplay.jsx
         │                           ▲
         │                           │
         └────── Sends Data ─────────┘
```

---

## 6. Core React Concepts Used

✅ useState()

✅ Controlled Components

✅ Props

✅ Callback Props

✅ Conditional Rendering

✅ List Rendering using map()

✅ Immutable State Updates

✅ Parent → Child Data Flow

✅ Child → Parent Communication

✅ Lifting State Up