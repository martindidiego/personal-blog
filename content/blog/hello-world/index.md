---
title: Compound React Components with Hooks + TypeScript
date: "2019-07-01"
---

When writing React components, it always pays off to spend a little bit of time thinking about how another developer would use them.

In this post, I’d like to dive a bit into Compound Components, a pattern for creating components that I’ve found to be a joy to use both as a creator and consumer.

We’ll be creating a small `<Tabs>` component with TypeScript and Context Hooks.

---

## What Are Compound Components?

At a high level, Compound Components are components which **wrap** and **implicitly share state** with other related components; these kinds of components are meant to be used together in a specific way but still allow for flexibility in composition.

There are essentially three parts to a component's API:

1. Its input
2. Its state delegation
3. Its composition delegation

With Compound Components, the creator is maintaining control of state while delegating composition to the consumer. Rather than providing a `<Tabs>` component, for instance, with fixed intrinsic parts and child components, the creator chooses to expose the underlying components while establishing an internal context between them to control state flow.

Basically, `<Tabs>` controls the state, and the user controls the markup.

## Compound Components in Action

In this post, we'll be building a `Tabs` compound component.

Here's a working demo of the final implementation:
https://codesandbox.io/s/vpvdq

**Note:** I highly encourage playing around with the Sandbox first as you can connect the dots as you code along.

---

The purpose of our `Tabs` component is to allow the user to change between panels of content. Only one panel will be shown at a time.

Our compound component will be made up of 3 parts:

1. `Tabs` - The parent component in charge of keeping state.
2. `Tab` - An element that allows changing of the active tab.
3. `Panel` - A container of content mapped to a specific tab.

Let's start by creating the `Tabs` component. This component will wrap all other components necessary to provide tabbing functionality and maintain state across all of them. If you're familiar with [Presentational and Compound Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0), this would be a Container component.

```tsx
const Tabs: React.FC = props => {
  const [activeTab, setActiveTab] = React.useState("a")
  return <>{props.children}</>
}
```

Since this component will be in charge of state and feeding it
into its children, let's create a Context.

```tsx
interface ITabsContext {
  activeTab: string
  setActiveTab: (label: string) => void
}

// highlight-start
export const TabsContext = React.createContext<ITabsContext | undefined>(
  undefined
)
// highlight-end

const Tabs: React.FC = props => {
  const [activeTab, setActiveTab] = React.useState("a")
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </TabsContext.Provider>
  )
}
```

If you're not familiar with `React.createContext`, it takes a default value for the entire context as an optional first argument. We're starting off with `undefined` here because our Context is actually set by the component's state.

So far, we have a `<Tabs>` component that has internal state and exposes its state via Context to any of its children.

Let's build the `<Tab>` and `<Panel>` components now. Once we piece these all together, it'll hopefully make more sense. Each of these components will consume the `TabsContext` we just created and only get the parts of the Context they care about.

```tsx
import { TabsContext } from "./Tabs"

export interface ITabProps {
  /**
   * Unique label of Tab to show when clicked.
   */
  label: string
}

/**
 * This component allows changing of the active Tab.
 */
export const Tab: React.FC<ITabProps> = props => {
  const { setActiveTab } = React.useContext(TabsContext)
  return (
    <div className="tab">
      <button onClick={() => setActiveTab(props.label)}>
        {props.children}
      </button>
    </div>
  )
}
```

```tsx
import * as React from "react"
import { TabsContext } from "./Tabs"

export interface IPanelProps {
  /**
   * Unique identifier for this tab.
   */
  label: string
}

/**
 * Individual panel component.
 */
export const Panel: React.FC<IPanelProps> = props => {
  const { activeTab } = React.useContext(TabsContext)
  return activeTab === props.label ? <div>{props.children}</div> : null
}
```

Next, let's import these individual components into `<Tabs>` and export them as part of the same module since we want that to be the main import a consumer uses. Here's where TypeScript can get tricky, but let's walk through what's going on.

```tsx
import { Tab, ITabProps } from './Tab';
import { Panel, IPanelProps } from './Panel';
// highlight-start
interface ITabsComposition {
  Tab: React.FC<ITabProps>;
  Panel: React.FC<IPanelProps>;
}
// highlight-end

// rest of Tabs.tsx...

const Tabs: React.FC & ITabsComposition = props => {
	...
}

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export { Tabs };

```

So here's what we've done

- Imported `<Tab>`, `<Panel>`, and their respective interfaces.
- Created a new interface called `ITabsComposition` which dictates what a `<Tab>` component will be composed of, in this case individual elements.
- Updated the type of `Tabs` to effectively say it's a `React.FunctionComponent` that also has properties defined in the `ITabsComposition` interface.
- Exported all of `Tabs`.

Now, over to the consumer.

Using the newly created component looks like this:

```tsx
import { Tabs } from "./Tabs"

function App() {
  return (
    <div className="App">
      <Tabs>
        {/* Group of tabs */}
        <Tabs.Tab label="a">Tab A</Tabs.Tab>
        <Tabs.Tab label="b">Tab B</Tabs.Tab>
        <Tabs.Tab label="c">Tab C</Tabs.Tab>

        {/* Tab panels */}
        <Tabs.Panel label="a">
          This is tab A{" "}
          <span role="img" aria-label="Rocket ship">
            🚀
          </span>
        </Tabs.Panel>
        <Tabs.Panel label="b">
          This is tab B{" "}
          <span role="img" aria-label="Diamond">
            💎
          </span>
        </Tabs.Panel>
        <Tabs.Panel label="c">
          This is tab C{" "}
          <span role="img" aria-label="Ghost">
            👻
          </span>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}
```

As you can see, the consumer is free to modify the markup as they please. Want to have the tabs underneath the panels of content? Not a problem. Want to style the tabs to be vertically aligned? Totally possible.

As long as `<Tabs>` is wrapping these child elements, the state should update just fine. All `<Tabs>` is doing here is maintaining state and providing a Context to all its children.

## Custom Context Hook

We have a working Tab compound component implementation, but we can do better. Rather than blindly export `TabsContext` from our `<Tabs>` component to use them in any child component, we can create a custom Hook that allows us to guarantee correct usage.

It would look something like this:

```tsx
/**
 * This Context hook allows our child components to easily reach
 * into the Tabs context and get the pieces it needs.
 *
 * Bonus: it even makes sure the component is used within a
 * Tabs component!
 */
export const useTabs = (): ITabsContext => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("This component must be used within a <Tabs> component.")
  }
  return context
}
```

This Hook would throw if any consumer of it is not in the context of the `<TabsContext.Provider>` component since the context value would be `null`.

Additionally, in this Hook you can take the context value and create some more abstracted functions which are then returned. For instance:

```tsx
export const useTabs = (): ITabsContext => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext)
  if (!context) {
    throw new Error("This component must be used within a <Tabs> component.")
  }

  const resetTabs = () => setActiveTab("a")

  return {
    activeTab,
    setActiveTab,
    resetTabs,
  }
}
```

It's definitely overkill for this example, but makes a lot of sense with complex Contexts.

You might be wondering what's so special about using components this way -- after all, we could have just exported those components individually and accomplished the same thing, right? The beauty of compound components lies in the fact that these components are _already set up to work with each other_. `Tabs.Tab` and `Tabs.Panel` are pulling in the state of the active tab and making updates as needed without you ever telling it to.

The dot-notation should imply here that these components are "more connected" than simply putting individual components together.

## Applications to Design Systems

I believe that this pattern shines the brightest in the context (pun intended) of a design system. One of the core principles authors of such systems follow is to generally prefer longevity of the system. When a system is too confined to a particular usage, it suffers from narrow scoping and may not be suitable as edge cases are discovered. In order to achieve longevity, one approach taken is to favor providing abstract components that prioritize composability over specific usage to target the middle-ground between restrictiveness and experimentation.

Similar to how design systems provide primitive atomic elements to compose functionality out of, Compound Components provide their internal elements and handle their communication for you.

To visualize an example, let's take a look at the [Material-UI Tabs](https://material-ui.com/components/tabs/) component.

```tsx
export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  )
}
```

While it may be wise to defer this kind of state management to the consumer, I think it's leaning too far away from a restrictiveness point of view. Almost any tab implementation will look identical to the example provided and is a missed opportunity to be abstracted away from the consumer. Now there will be thousands of slightly different implementations of the same core logic. Let's take this down a notch and apply this to a smaller set of teams rather than Material-UI's audience (the entire world): a developer shipping `<Tabs>` in one project has to learn about how state is managed for `<Tabs>` in another project. Apply this same issue for tens or hundreds of other components that all do the same thing and the developer spends more time fixing the same problem rather than delivering value.

A quick dive into [the source code of `<Tabs>`](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tabs/Tabs.js#L81-L90) reveals that this component does not maintain state between `<Tab>` or `<TabContainer>`. It is up to the consumer to compose the tab functionality _and_ maintain state.

I hope you can add this paradigm into your toolbox of UI development!

## Additional Resources

If you're interested in diving deeper in Compound Components, check these links out:

- [Quick guide to React compound components](https://blog.logrocket.com/guide-to-react-compound-components-9c4b3eb482e9/)
- [React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Compound Components in React Using the Context API](https://css-tricks.com/compound-components-in-react-using-the-context-api/)
