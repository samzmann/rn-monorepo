This is an example monorepo showing an issue with sharing native dependencies.

# Basic repo structure

`@rn-monorepo/shared-image` (located in `packages/shared-image`) is a shared component meant to be reused across many apps. It depends on `react-native-fast-image` to render a .webp image.

`AppOne` is a RN app. It depends on:
- `@rn-monorepo/shared-image` to render the shared image
- `react-native-fast-image` to render an app specific .webp image

`AppTwo` is another RN app. This one only depends on `@rn-monorepo/shared-image` to render the shared image.

All apps and shared packages are Yarn Workspaces:
```json
// package.json
{
  "workspaces": {
    "packages": [
      "apps/*",
      "packages/*"
    ],
    "nohoist": [
      "**/react",
      "**/react-native",
      "**/react-native/**"
    ]
  }
}
```

# Running AppOne

Install node modules
```
yarn
```

Install Pods
```
cd apps/AppOne/ios && bundle exec pod install
```

Run the app
```
yarn ios
```

# The first problem

The app should build fine, but crashes immediately with this error:
```
Invariant Violation: Tried to register two views with the same name FastImageView.
```

Why???

Both `AppOne` and `@rn-monorepo/shared-image` have `react-native-fast-image@8.6.3` listed as a dependency. Same version. So why is there an issue?

### Hacky unusable workaround

If I comment out the code that is crashing the app I can get the app to work fine. In `node_modules/react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry.js` comment out the `invariant` call on L82.

💡 Alternatively, run `yarn patch-package` in the AppOne dir to install a patch that comments out that `invariant` call.

Now the app runs fine. But obviously this is not a solution I want to keep because I will miss all the important warnings telling me when two native views are using the same name (super important if I mistakenly have two different versions of a native dependency).

### Other solution attempts

I tried adding `react-native-fast-image` to the nohoist list but that didn't help...


# The second, less annoying problem
