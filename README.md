# RN Dreadful Monorepo 😭
This is an example monorepo showing an issue with sharing native dependencies.

# Basic repo structure

```text
rn-monorepo
├── apps
│   ├── AppOne
│   └── AppTwo
├── package.json
└── packages
    └── shared-image
```

All subdirectories of `apps/` and `/packages` are Yarn Workspaces.

#### shared-image
is a shared component meant to be reused across many apps. It depends on `react-native-fast-image` to render a .webp image.

#### AppOne
A RN app that depends on:
- `@rn-monorepo/shared-image` to render the shared image
- `react-native-fast-image` to render an app specific .webp image

#### AppTwo
Another RN app. This one only depends on:
- `@rn-monorepo/shared-image` to render the shared image.

# Running the apps

**Install node modules**
```shell
yarn
```

**Install app Pods**

1. nav to app ios dir
    ```shell
    cd apps/AppOne/ios # or apps/AppTwo/ios
    ```
2. Install cocoapods via bundler
    ```shell
    bundle install
    ```
3. Install pods
    ```shell
    bundle exec pod install
    ```

**Run the app**
```shell
yarn ios
```

# The first problem

Try to build and run `AppOne`

The app should build fine, but crashes immediately with this error:
```
Invariant Violation: Tried to register two views with the same name FastImageView.
```

Why???

Both `AppOne` and `@rn-monorepo/shared-image` have `react-native-fast-image@8.6.3` listed as a dependency. Same version. So why is there an issue?

### Hacky NOT USABLE workaround

If I comment out the code that is crashing the app I can get the app to work fine. In `node_modules/react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry.js` comment out the `invariant` call on L82.

💡 Alternatively, run `yarn patch-package` in the AppOne dir to install a patch that comments out that `invariant` call.

Now the app runs fine. But obviously this is not a solution I want to keep because I will miss all the important warnings telling me when two native views are using the same name (super important if I mistakenly have two different versions of a native dependency).

### Other solution attempts

I tried adding `react-native-fast-image` to the nohoist list but that didn't help...


# The second, less annoying problem

Try to build and run `AppTwo`

The app should build fine, but crashes immediately with this error:
```
Invariant Violation: requireNativeComponent: "FastImageView" was not found in the UIManager.
```

`AppTwo` only explicitly depends on `@rn-monorepo/shared-image`. However

### Kind usable workaround

If I add `react-native-fast-image` as a dependency in AppTwo/package.json, reinstall node_modules, pods, and rebuild, now it's working fine.

Ok, cool, but I'd prefer not to have to do that. This solution give lots of room for error, for example forgetting to update the dependency in the app after it's been updated in the shared package...

So is it not possible to have the native code from `react-native-fast-image` be automatically installed if AppTwo depends on `@rn-monorepo/shared-image`? That would be ideal. I think...

# To recap...

Ideally, I would like to

### Have a shared package be able to manage its own native dependencies
That means if `@rn-monorepo/shared-image` depends on `react-native-fast-image`, it will automatically cause whatever app depends on it to install native deps (as opposed to have to explicitly add `react-native-fast-image` as a dependency of the app).

For example: AppTwo should not have to explicitly depend on `react-native-fast-image` to use `@rn-monorepo/shared-image`.

### Have both a shared package and an app depend on the same native dependency if both require it for different use cases (for example in AppOne).
For example if  `@rn-monorepo/shared-image` and `AppOne` both depend on `react-native-fast-image@8.6.3`, I should not run into the `Tried to register two views with the same name` error.

Of course if there are two different versions of `react-native-fast-image` in use, then I still expect to see this error.
