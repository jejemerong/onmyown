//
//  ShareViewController.swift
//  onmyownShare
//
//  Created by jejemerong on 1/17/25.
//
import UIKit
import Social
import Foundation

class ShareViewController: UIViewController {
    let textView = UITextView()

    override func viewDidLoad() {
        super.viewDidLoad()
      
        // // App Group ID 설정
         let myGroupID = "group.org.reactjs.native.example.onmyown.Share"

         // 앱 그룹 디렉토리 경로 가져오기
         if let groupDir = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: myGroupID)?.path {
             print("groupDir: \(groupDir)")
           
             // MMKV 초기화
             MMKV.initialize(rootDir: groupDir)
         } else {
             print("Error: Group directory is nil. Check your app group ID.")
         }
        
        // UI 설정
        textView.frame = CGRect(x: 20, y: 200, width: self.view.bounds.width - 40, height: self.view.bounds.height - 220) // 위치 및 크기 조정
        textView.font = UIFont.systemFont(ofSize: 16)
        textView.contentInset = UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20) // 여백 추가
        self.view.addSubview(textView)
        
        let imageView = UIImageView()
        imageView.frame = CGRect(x: (self.view.frame.width - 100) / 2, y: 80, width: 100, height: 100)
        imageView.contentMode = .scaleAspectFit
        imageView.image = UIImage(named: "myduck") // 이미지 이름에 맞게 변경
        self.view.addSubview(imageView)
        
        // TODO: 현재 유저의 챌린지 정보 가져오기 => MMKV 상에 저장된 챌린지 목록 조회
        let button1 = UIButton(type: .system)
        button1.setTitle("📗 각자도생 스터디", for: .normal)
        button1.frame = CGRect(x: (self.view.frame.width - 200) / 2, y: 320, width: 200, height: 50) 
        // 버튼 위치 및 크기 조정
        button1.layer.cornerRadius = 10 // 모서리 둥글게
        button1.layer.borderWidth = 1 // 테두리 두께
        button1.layer.borderColor = UIColor.lightGray.cgColor // 테두리 색상
        button1.backgroundColor = UIColor.white // 배경색
        button1.setTitleColor(UIColor.black, for: .normal) // 텍스트 색상
        button1.addTarget(self, action: #selector(button1Tapped), for: .touchUpInside)
        self.view.addSubview(button1)

        let button2 = UIButton(type: .system)
        button2.setTitle("🇩🇪 듀오링고", for: .normal)
        button2.frame = CGRect(x: (self.view.frame.width - 200) / 2, y: 380, width: 200, height: 50) // 버튼 위치 및 크기 조정
        button2.layer.cornerRadius = 10 // 모서리 둥글게
        button2.layer.borderWidth = 1 // 테두리 두께
        button2.layer.borderColor = UIColor.lightGray.cgColor // 테두리 색상
        button2.backgroundColor = UIColor.white // 배경색
        button2.setTitleColor(UIColor.black, for: .normal) // 텍스트 색상
        button2.addTarget(self, action: #selector(button2Tapped), for: .touchUpInside)
        self.view.addSubview(button2)
        let button3 = UIButton(type: .system)
        button3.setTitle("💪 헬스장 출석", for: .normal)
        button3.frame = CGRect(x: (self.view.frame.width - 200) / 2, y: 440, width: 200, height: 50)
        button3.layer.cornerRadius = 10 // 모서리 둥글게
        button3.layer.borderWidth = 1 // 테두리 두께
        button3.layer.borderColor = UIColor.lightGray.cgColor // 테두리 색상
        button3.backgroundColor = UIColor.white // 배경색
        button3.setTitleColor(UIColor.black, for: .normal) // 텍스트 색상
        button3.addTarget(self, action: #selector(button3Tapped), for: .touchUpInside)
        self.view.addSubview(button3)
        
        // 네비게이션 바 추가
        let navigationBar = UINavigationBar(frame: CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: 56))
        let navigationItem = UINavigationItem(title: "챌린지 공유하기")
        navigationItem.rightBarButtonItem = {
            let button = UIBarButtonItem(barButtonSystemItem: .save, target: self, action: #selector(linkTo))
            button.tintColor = UIColor(red: 1.0, green: 202/255.0, blue: 90/255.0, alpha: 1.0)
            return button
        }()
        navigationItem.leftBarButtonItem = {
            let button = UIBarButtonItem(barButtonSystemItem: .cancel, target: self, action: #selector(cancel))
            button.tintColor = UIColor(red: 1.0, green: 202/255.0, blue: 90/255.0, alpha: 1.0)
            return button
        }()
        navigationBar.setItems([navigationItem], animated: false)
        self.view.addSubview(navigationBar)

        self.view.backgroundColor = UIColor.white
        
        // extensionContext를 통해 공유 데이터 처리
        handleIncomingContent()
    }

    @objc func button1Tapped() {
        saveChallenge(challenge: "각자도생 스터디")
    }

    @objc func button2Tapped() {
        saveChallenge(challenge: "듀오링고")
    }

    @objc func button3Tapped() {
        saveChallenge(challenge: "헬스장 출석")
    }

// 누른 버튼 상태값을 user default 에 저장하기
//  @objc func saveChallenge(challenge: String) {
//    let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.example.onmyown.Share")
//    userDefaults?.set(challenge, forKey: "selectedChallenge")
//  }
  
  // MMKV 에 저장하기
  @objc func saveChallenge(challenge: String) {
    guard let mmkv = MMKV(mmapID: "onmyown") else {
                return
            }
    mmkv.set("string", forKey: "selectedChallenge_type")
    mmkv.set(challenge, forKey: "selectedChallenge")
    print("Swift: string = \(mmkv.string(forKey: "selectedChallenge") ?? "")")
  }

    func handleIncomingContent() {
        // 공유된 항목 가져오기
        guard let extensionItems = self.extensionContext?.inputItems as? [NSExtensionItem] else { return }
        
        for item in extensionItems {
            if let attachments = item.attachments {
                for provider in attachments {
                    if provider.hasItemConformingToTypeIdentifier("public.plain-text") {
                        provider.loadItem(forTypeIdentifier: "public.plain-text", options: nil) { [weak self] (text, error) in
                            if let sharedText = text as? String {
                                DispatchQueue.main.async {
                                    self?.textView.text = sharedText
                                }
                            }
                        }
                    } else if provider.hasItemConformingToTypeIdentifier("public.url") {
                        provider.loadItem(forTypeIdentifier: "public.url", options: nil) { [weak self] (url, error) in
                            if let sharedURL = url as? URL {
                                DispatchQueue.main.async {
                                    self?.textView.text = sharedURL.absoluteString
                                }
                            }
                        }
                    } else if provider.hasItemConformingToTypeIdentifier("public.image") {
                      provider.loadItem(forTypeIdentifier: "public.image", options: nil) { [weak self] (url, error) in
                          if let sharedURL = url as? URL {
                              DispatchQueue.main.async {
                                  self?.textView.text = sharedURL.absoluteString
                              }
                          }
                      }
                  }
                }
            }
        }
    }

    @objc func saveButtonTapped() {
        // 입력된 텍스트 처리
        let text = textView.text ?? ""

        // 데이터가 비어있지 않은지 확인
        guard !text.isEmpty else {
            print("저장할 텍스트가 비어 있습니다.")
            return
        }

        // 데이터를 UserDefaults에 저장
        let userDefaults = UserDefaults(suiteName: "group.org.reactjs.native.example.onmyown.Share")
        print("UserDefaults 접근 성공")
        
        // UserDefaults에 데이터 저장
        do {
            userDefaults?.set(text, forKey: "shared_text") // UserDefaults를 사용하여 데이터 저장
            print("데이터가 성공적으로 저장되었습니다.")
        } catch {
            print("데이터 저장 중 오류 발생: \(error.localizedDescription)")
        }
        
        // 저장된 데이터 확인
        if let savedText = userDefaults?.string(forKey: "shared_text") {
            print("저장된 값: \(savedText)")
        } else {
            print("저장된 값이 없습니다.")
        }
        
        
    }
  
  @objc func linkTo(){
    // Extension 종료 후 메인 앱으로 이동
     self.extensionContext?.completeRequest(returningItems: nil) { _ in
         let url = URL(string: "onmyown://")!
         _ = self.openURL(url)
     }
  }
    
    @objc func cancel() {
        self.extensionContext?.completeRequest(returningItems: nil, completionHandler: nil)
    }

    // URL을 여는 헬퍼 메서드
    func openURL(_ url: URL) -> Bool {
        var responder: UIResponder? = self
        while responder != nil {
            if let application = responder as? UIApplication {
                application.open(url)
                return true
            }
            responder = responder?.next
        }
        return false
    }
}
