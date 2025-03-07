//
//  RCTUserDefaultsModule.m
//  onmyown
//
//  Created by jejemerong on 2/18/25.
//
#import "RCTUserDefaultsModule.h"

@implementation RCTUserDefaultsModule

RCT_EXPORT_MODULE(UserDefaultsModule);

// 데이터 저장
RCT_EXPORT_METHOD(setItem:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
      [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] setObject:value forKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        resolve(@YES);
    }
    @catch (NSException *exception) {
        reject(@"userdefaults_set_error", @"Error saving data to UserDefaults", nil);
    }
}

// 데이터 가져오기
RCT_EXPORT_METHOD(getItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *value = [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] stringForKey:key];
    if (value) {
        resolve(value);
    } else {
        reject(@"userdefaults_get_error", @"Key not found", nil);
    }
}

//TODO: user defaults 안쓴다면 MMKV getAppGroupDirectory method 만 따로 모듈로 빼기
// MMKV groupDir 데이터 가져오기
RCT_EXPORT_METHOD(getAppGroupDirectory:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *myGroupID = @"group.org.reactjs.native.example.onmyown.Share";
    NSURL *groupURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:myGroupID];
    if (groupURL) {
        resolve(groupURL.path);
    } else {
        NSError *error = [NSError errorWithDomain:@"RCTUserDefaultsModule" code:500 userInfo:@{NSLocalizedDescriptionKey: @"Failed to get App Group directory"}];
        reject(@"no_directory", @"There was an error getting the App Group directory", error);
    }
}

// 데이터 삭제
RCT_EXPORT_METHOD(removeItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
      [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] removeObjectForKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        resolve(@YES);
    }
    @catch (NSException *exception) {
        reject(@"userdefaults_remove_error", @"Error removing data from UserDefaults", nil);
    }
}

@end
