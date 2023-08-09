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
    @Around("execution(* com.santa.projectservice.service.impl.*.*(..))")
    public Object measureMethodExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        log.info("+++++++++++++++++++++++++++++++++++");
        long start = System.currentTimeMillis();
        log.info(joinPoint.getSignature().getName() + " 시작");
        Object[] methodArguments = joinPoint.getArgs();
        for (Object argument : methodArguments) {
            log.info("Arg: " + argument);
        }
        log.info("+++++++++++++++++++++++++++++++++++");

        Object proceed = joinPoint.proceed();

        log.info("+++++++++++++++++++++++++++++++++++");
        log.info(joinPoint.getSignature().getName() + " 끝");
        long executionTime = System.currentTimeMillis() - start;
        log.info("executed in: " + executionTime + "ms");
        log.info("+++++++++++++++++++++++++++++++++++");
        return proceed;
    }
}
