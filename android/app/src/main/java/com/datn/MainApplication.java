package com.datn;

import android.app.Application;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.taessina.paypal.RNPaypalWrapperPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new NetInfoPackage(),
            new RNFirebaseMessagingPackage(), //add this
            new RNFirebaseNotificationsPackage(), //add this
            new ReactNativeOneSignalPackage(),
            new RNFirebasePackage(),
            new RNPaypalWrapperPackage(),
            new BackgroundTimerPackage(),
            new ReactNativePushNotificationPackage(),
            new RNFusedLocationPackage(),
            new ReactNativeRestartPackage(),
            new ReactNativeLocalizationPackage(),
            new SvgPackage(),
            new ImagePickerPackage(),
            new FBSDKPackage(mCallbackManager),
            new VectorIconsPackage(),
            new MapsPackage(),
            new RNGestureHandlerPackage()

      );
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

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
