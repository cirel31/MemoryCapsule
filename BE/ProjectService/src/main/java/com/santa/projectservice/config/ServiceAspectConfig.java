package com.santa.projectservice.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Aspect
@Component
@Service
@Slf4j
public class ServiceAspectConfig {
//    @Before("execution(* com.santa.projectservice.service.impl.*.*(..))")
//    public void before(JoinPoint joinPoint) {
//        System.out.println("---------------------------------------------------");
//        System.out.println(joinPoint.getSignature().getDeclaringTypeName());
//        System.out.println(joinPoint.getSignature().getName());
//        System.out.println(LocalDateTime.now().toString());
//        System.out.println("---------------------------------------------------");
//    }
//
//    @After("execution(* com.santa.projectservice.service.impl.*.*(..))")
//    public void after(JoinPoint joinPoint) {
//        System.out.println("---------------------------------------------------");
//        System.out.println(joinPoint.getSignature().getDeclaringTypeName());
//        System.out.println(joinPoint.getSignature().getName());
//        System.out.println(LocalDateTime.now().toString());
//        System.out.println("---------------------------------------------------");
//    }

    @Around("execution(* com.santa.projectservice.service.impl.*.*(..))")
    public Object measureMethodExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("+++++++++++++++++++++++++++++++++++");
        long start = System.currentTimeMillis();
        System.out.println(joinPoint.getSignature().getName() + " 시작");
        Object[] methodArguments = joinPoint.getArgs();
        for (Object argument : methodArguments) {
            System.out.println("Arg: " + argument);
        }
        System.out.println("+++++++++++++++++++++++++++++++++++");

        Object proceed = joinPoint.proceed();

        System.out.println("+++++++++++++++++++++++++++++++++++");
        System.out.println(joinPoint.getSignature().getName() + " 끝");
        long executionTime = System.currentTimeMillis() - start;
        System.out.println("executed in: " + executionTime + "ms");
        System.out.println("+++++++++++++++++++++++++++++++++++");
        return proceed;
    }
}
