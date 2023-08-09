package com.example.userservice.service;

import com.example.userservice.model.Enum.FriendType;
import com.example.userservice.model.Enum.ProjectState;
import com.example.userservice.model.dto.FriendDto;
import com.example.userservice.model.entity.ConnectId;
import com.example.userservice.model.entity.Connected;
import com.example.userservice.model.entity.Project;
import com.example.userservice.model.entity.User;
import com.example.userservice.repository.ConnectedRepository;
import com.example.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class FriendServiceImpl implements FriendService {
    private final ConnectedRepository connectedRepository;
    private final UserRepository userRepository;

    @Override
    public List<User> findByAllFriends(final Long userId) throws Exception {
        //TODO: userId의 친구정보를 주는 서비스
        return userRepository.findById(Long.valueOf(userId)).orElseThrow(() -> new Exception("user not found - " + userId))
                .getFriendList();
    }

    @Override
    public FriendDto.showFriend findUserEmail(Long hostId, String guestEmail) throws Exception {
        //TODO: Email로 user 검색 서비스
        User user = userRepository.findByEmail(guestEmail).orElseThrow(() -> new Exception("User not found"));
        if (hostId == user.getIdx()) {
            throw new Exception("User not found");
        }
        Optional<Connected> connected = getConnected(hostId, user.getIdx());
        /**
         * 없으면 상대가 친구 신청했을수도 아니면 아예 관계 없음
         * 있으면 내가 친구 신청했을수도 아니면 이미 친구관계
         */
        int status = FriendType.NO_FRIEND.getCode();
        if (connected.isPresent()) {
            if (connected.get().getConfirm()) { // 이미 친구관계
                status = FriendType.FRIEND.getCode();
            } else {
                status = FriendType.SEND_REQUEST.getCode(); //친구 신청함
            }
        } else {
            connected = getConnected(user.getIdx(), hostId);
            if (connected.isPresent()) {
                status = FriendType.COME_REQUEST.getCode(); //상대가 친구 신청함
            }
        }

        return FriendDto.showFriend.builder()
                .userId(user.getIdx())
                .email(user.getEmail())
                .imgUrl(user.getImgUrl())
                .nickname(user.getNickName())
                .status(status)
                .build();
    }

    private Optional<Connected> getConnected(Long hostId, Long guestId) {
        return connectedRepository.findByConnectIdRequesterIdAndConnectIdRequesteeId(hostId, guestId);
    }

    @Override
    @Transactional
    public boolean deleteFirend(Long hostId, Long guestId) {
        //TODO: 친구 삭제 서비스
        connectedRepository.disconnectFriend(hostId, guestId);
        connectedRepository.disconnectFriend(guestId, hostId);
        return true;
    }

    @Override
    public boolean userAddFriend(Long hostId, Long guestId) {
        //TODO: 친구 추가 서비스
        Optional<Connected> connected = getConnected(hostId, guestId);
        if (connected.isPresent()) {
            return false;
        }
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
    public boolean cancelUserAddFriend(Long hostId, Long guestId) {
        //TODO: 친구 요청 보내기 취소 서비스
        if (connectedRepository.disconnectFriend(hostId, guestId) == 1) return true;
        return false;
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
                        .confirm(true)
                .build());
        return true;
    }

    @Override
    @Transactional
    public boolean userRejectFriend(Long hostId, Long guestId) {
        //TODO: 친구 요청이 온걸 거절하는 서비스
        if (connectedRepository.disconnectFriend(guestId, hostId) == 1) return true;
        return false;
    }

    @Override
    @Transactional
    public List<FriendDto.basicFriendInfo> getFriendsInfo(Long userId) throws Exception {
        //TODO: 친구  정보 조회
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException(String.format("%ld 의 유저는 존재하지 않습니다.", userId)));
        List<User> friendList = user.getFriendList();


        List<FriendDto.basicFriendInfo> friendInfoList = friendList.stream()
                .map(e -> {
                    return makeFriendInfo(e, FriendType.FRIEND);
                }).collect(Collectors.toList());

        //요청이 옴
        friendInfoList.addAll(user.getComeRequestFriendList().stream()
                .map(e -> {
                    return makeFriendInfo(e, FriendType.COME_REQUEST);
                }).collect(Collectors.toList()));

        //내가 요청 보냄
        friendInfoList.addAll(user.getSendRequestFriendList().stream()
                .map(e -> {
                    return makeFriendInfo(e, FriendType.SEND_REQUEST);
                }).collect(Collectors.toList()));
        return friendInfoList;
    }

    private FriendDto.basicFriendInfo makeFriendInfo(User e, FriendType type) {
        List<Project> projectList = e.getProjectList();
        long inProjectCount = projectList.stream().filter(k -> ProjectState.IN_PROGRESS.equals(k.getState())).count();

        Integer userTotalWrite = userRepository.wroteArticleTotal(e.getIdx());

        return FriendDto.basicFriendInfo.builder()
                .idx(e.getIdx())
                .name(e.getName())
                .nickname(e.getNickName())
                .imgUrl(e.getImgUrl())
                .totalInProjectCnt(inProjectCount)
                .totalProjectCnt(Long.valueOf(projectList.size()))
                .totalWriteCnt(Long.valueOf(userTotalWrite))
                .status(type.getCode())
                .build();
    }
}
