@echo off
set classpath=%classpath%;./lib/httpclient-4.5.2.jar
set classpath=%classpath%;./lib/commons-codec-1.9.jar
set classpath=%classpath%;./lib/commons-logging-1.2.jar
set classpath=%classpath%;./lib/fluent-hc-4.5.2.jar
set classpath=%classpath%;./lib/httpclient-4.5.2.jar
set classpath=%classpath%;./lib/httpclient-cache-4.5.2.jar
set classpath=%classpath%;./lib/httpclient-win-4.5.2.jar
set classpath=%classpath%;./lib/httpcore-4.4.4.jar
set classpath=%classpath%;./lib/httpmime-4.5.2.jar
set classpath=%classpath%;./lib/jna-4.1.0.jar
set classpath=%classpath%;./lib/jna-platform-4.1.0.jar

javac -encoding utf-8 %1.java
java %1 %2 %3 %4 %5 %6 %7 %8 %9