package com.example.userservice.service;

import com.example.userservice.model.entity.ConnectId;
import com.example.userservice.model.entity.Connected;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.ConnectedRepository;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FriendServiceImpl implements FriendService{
    ConnectedRepository connectedRepository;
    UserRepository userRepository;

    @Override
    public List<User> findByAllFriends(final Long userId) throws Exception {
        //TODO: userId의 친구정보를 주는 서비스
        return userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new Exception("user not found - " + userId))
                .getFriendList();
    }

    @Override
    @Transactional
    public boolean deleteFirend(Long hostId, Long guestId) {
        //TODO: 친구 삭제 서비스
        connectedRepository.disconnectFriend(hostId, guestId);
        connectedRepository.disconnectFriend(guestId, hostId);
//        ConnectId connectId = new ConnectId();
//        connectId.setRequesterId(hostId);
//        connectId.setRequesteeId(guestId);
//
//        boolean present = connectedRepository.findById(connectId).isPresent();
//        log.info("첫번째 {}", present);
//        if(present){
//            log.info("분기는 탄다");
//            connectedRepository.deleteById(connectId);
//            log.info("딜리트 됐나?");
//        }
//        connectId.setRequesterId(guestId);
//        connectId.setRequesteeId(hostId);
//        boolean present1 = connectedRepository.findById(connectId).isPresent();
//        log.info("두번쨰 {}", present1);
//        if(present1){
//            connectedRepository.deleteById(connectId);
//        }
////        connectedRepository.deleteConnection(connectId);
        return true;
    }

    @Override
    public Optional<User> findUserEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean userAddFriend(Long hostId, Long guestId) {
        //TODO: 친구 추가 서비스
        connectedRepository.save(Connected.builder()
                .connectId(ConnectId.builder()
                        .requesterId(hostId)
                        .requesteeId(guestId)
                        .build())
                .confirm(false)
                .build());
        return true;
    }

    @Override
    @Transactional
    public boolean userConfirmFriend(Long hostId, Long guestId) {
        //TODO: 친구 수락 서비스
        connectedRepository.updateConfirmStateByerIdAndeeId(hostId, guestId, true);
        connectedRepository.save(Connected.builder()
                .connectId(ConnectId.builder()
                        .requesterId(guestId)
                        .requesteeId(hostId)
                        .build())
                .build());
        return true;
    }
}
