package com.primeclient;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.rnzendeskchat.RNZendeskChatModule;
import com.rnzendeskchat.RNZendeskChatPackage;
import com.facebook.react.bridge.ReactApplicationContext;
// import com.reactlibrary.RNZendeskChatApiPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.robertsheao.RNZenDeskSupport.RNZenDeskSupport;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  static RNZendeskChatModule rnZendeskChatModule;

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  
    ReactApplicationContext reactContext = new ReactApplicationContext(this); 
    rnZendeskChatModule = new RNZendeskChatModule(reactContext);
    rnZendeskChatModule.init("h8r4wrwGWOz7VUPJ6Y9XFTMkeBbSHSuN");
  }
}
