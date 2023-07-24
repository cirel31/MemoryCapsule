package com.santa.projectservice.jpa;

import com.sun.istack.NotNull;
import jdk.jfr.DataAmount;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bouncycastle.util.Times;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@Table(name="user")
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_idx;

    @Column(unique = true) private String user_email;
    @Column private int user_point;
    @Column private String user_name;
    @Column private String user_nickname;
    @Column @NotNull private String user_pwd;
    @Column @CreationTimestamp private Timestamp user_created;
    @Column @CreationTimestamp private Timestamp user_updated;
    @Column private Boolean user_deleted;
    @Column private int user_role;
    @Column(unique = true) @NotNull private String user_phone;
    @Column(length = 2048) private String user_imgurl;

}
