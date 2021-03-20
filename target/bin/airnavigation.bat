@REM ----------------------------------------------------------------------------
@REM  Copyright 2001-2006 The Apache Software Foundation.
@REM
@REM  Licensed under the Apache License, Version 2.0 (the "License");
@REM  you may not use this file except in compliance with the License.
@REM  You may obtain a copy of the License at
@REM
@REM       http://www.apache.org/licenses/LICENSE-2.0
@REM
@REM  Unless required by applicable law or agreed to in writing, software
@REM  distributed under the License is distributed on an "AS IS" BASIS,
@REM  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@REM  See the License for the specific language governing permissions and
@REM  limitations under the License.
@REM ----------------------------------------------------------------------------
@REM
@REM   Copyright (c) 2001-2006 The Apache Software Foundation.  All rights
@REM   reserved.

@echo off

set ERROR_CODE=0

:init
@REM Decide how to startup depending on the version of windows

@REM -- Win98ME
if NOT "%OS%"=="Windows_NT" goto Win9xArg

@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" @setlocal

@REM -- 4NT shell
if "%eval[2+2]" == "4" goto 4NTArgs

@REM -- Regular WinNT shell
set CMD_LINE_ARGS=%*
goto WinNTGetScriptDir

@REM The 4NT Shell from jp software
:4NTArgs
set CMD_LINE_ARGS=%$
goto WinNTGetScriptDir

:Win9xArg
@REM Slurp the command line arguments.  This loop allows for an unlimited number
@REM of arguments (up to the command line limit, anyway).
set CMD_LINE_ARGS=
:Win9xApp
if %1a==a goto Win9xGetScriptDir
set CMD_LINE_ARGS=%CMD_LINE_ARGS% %1
shift
goto Win9xApp

:Win9xGetScriptDir
set SAVEDIR=%CD%
%0\
cd %0\..\.. 
set BASEDIR=%CD%
cd %SAVEDIR%
set SAVE_DIR=
goto repoSetup

:WinNTGetScriptDir
set BASEDIR=%~dp0\..

:repoSetup
set REPO=


if "%JAVACMD%"=="" set JAVACMD=java

if "%REPO%"=="" set REPO=%BASEDIR%\repo

set CLASSPATH="%BASEDIR%"\etc;"%REPO%"\org\springframework\boot\spring-boot-starter-data-jpa\2.3.4.RELEASE\spring-boot-starter-data-jpa-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-aop\2.3.4.RELEASE\spring-boot-starter-aop-2.3.4.RELEASE.jar;"%REPO%"\org\aspectj\aspectjweaver\1.9.6\aspectjweaver-1.9.6.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-jdbc\2.3.4.RELEASE\spring-boot-starter-jdbc-2.3.4.RELEASE.jar;"%REPO%"\com\zaxxer\HikariCP\3.4.5\HikariCP-3.4.5.jar;"%REPO%"\org\springframework\spring-jdbc\5.2.9.RELEASE\spring-jdbc-5.2.9.RELEASE.jar;"%REPO%"\jakarta\transaction\jakarta.transaction-api\1.3.3\jakarta.transaction-api-1.3.3.jar;"%REPO%"\jakarta\persistence\jakarta.persistence-api\2.2.3\jakarta.persistence-api-2.2.3.jar;"%REPO%"\org\hibernate\hibernate-core\5.4.21.Final\hibernate-core-5.4.21.Final.jar;"%REPO%"\org\jboss\logging\jboss-logging\3.4.1.Final\jboss-logging-3.4.1.Final.jar;"%REPO%"\org\javassist\javassist\3.24.0-GA\javassist-3.24.0-GA.jar;"%REPO%"\net\bytebuddy\byte-buddy\1.10.14\byte-buddy-1.10.14.jar;"%REPO%"\antlr\antlr\2.7.7\antlr-2.7.7.jar;"%REPO%"\org\jboss\jandex\2.1.3.Final\jandex-2.1.3.Final.jar;"%REPO%"\com\fasterxml\classmate\1.5.1\classmate-1.5.1.jar;"%REPO%"\org\dom4j\dom4j\2.1.3\dom4j-2.1.3.jar;"%REPO%"\org\hibernate\common\hibernate-commons-annotations\5.1.0.Final\hibernate-commons-annotations-5.1.0.Final.jar;"%REPO%"\org\glassfish\jaxb\jaxb-runtime\2.3.3\jaxb-runtime-2.3.3.jar;"%REPO%"\jakarta\xml\bind\jakarta.xml.bind-api\2.3.3\jakarta.xml.bind-api-2.3.3.jar;"%REPO%"\org\glassfish\jaxb\txw2\2.3.3\txw2-2.3.3.jar;"%REPO%"\com\sun\istack\istack-commons-runtime\3.0.11\istack-commons-runtime-3.0.11.jar;"%REPO%"\org\springframework\data\spring-data-jpa\2.3.4.RELEASE\spring-data-jpa-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\data\spring-data-commons\2.3.4.RELEASE\spring-data-commons-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\spring-orm\5.2.9.RELEASE\spring-orm-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-context\5.2.9.RELEASE\spring-context-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-tx\5.2.9.RELEASE\spring-tx-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-beans\5.2.9.RELEASE\spring-beans-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-core\5.2.9.RELEASE\spring-core-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-jcl\5.2.9.RELEASE\spring-jcl-5.2.9.RELEASE.jar;"%REPO%"\org\slf4j\slf4j-api\1.7.30\slf4j-api-1.7.30.jar;"%REPO%"\org\springframework\spring-aspects\5.2.9.RELEASE\spring-aspects-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-mail\2.3.4.RELEASE\spring-boot-starter-mail-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-starter\2.3.4.RELEASE\spring-boot-starter-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot\2.3.4.RELEASE\spring-boot-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-autoconfigure\2.3.4.RELEASE\spring-boot-autoconfigure-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-logging\2.3.4.RELEASE\spring-boot-starter-logging-2.3.4.RELEASE.jar;"%REPO%"\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar;"%REPO%"\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar;"%REPO%"\org\apache\logging\log4j\log4j-to-slf4j\2.13.3\log4j-to-slf4j-2.13.3.jar;"%REPO%"\org\apache\logging\log4j\log4j-api\2.13.3\log4j-api-2.13.3.jar;"%REPO%"\org\slf4j\jul-to-slf4j\1.7.30\jul-to-slf4j-1.7.30.jar;"%REPO%"\jakarta\annotation\jakarta.annotation-api\1.3.5\jakarta.annotation-api-1.3.5.jar;"%REPO%"\org\yaml\snakeyaml\1.26\snakeyaml-1.26.jar;"%REPO%"\org\springframework\spring-context-support\5.2.9.RELEASE\spring-context-support-5.2.9.RELEASE.jar;"%REPO%"\com\sun\mail\jakarta.mail\1.6.5\jakarta.mail-1.6.5.jar;"%REPO%"\com\sun\activation\jakarta.activation\1.2.2\jakarta.activation-1.2.2.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-security\2.3.4.RELEASE\spring-boot-starter-security-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\spring-aop\5.2.9.RELEASE\spring-aop-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\security\spring-security-config\5.3.4.RELEASE\spring-security-config-5.3.4.RELEASE.jar;"%REPO%"\org\springframework\security\spring-security-core\5.3.4.RELEASE\spring-security-core-5.3.4.RELEASE.jar;"%REPO%"\org\springframework\security\spring-security-web\5.3.4.RELEASE\spring-security-web-5.3.4.RELEASE.jar;"%REPO%"\org\springframework\spring-expression\5.2.9.RELEASE\spring-expression-5.2.9.RELEASE.jar;"%REPO%"\org\passay\passay\1.6.0\passay-1.6.0.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-web\2.3.4.RELEASE\spring-boot-starter-web-2.3.4.RELEASE.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-json\2.3.4.RELEASE\spring-boot-starter-json-2.3.4.RELEASE.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-databind\2.11.2\jackson-databind-2.11.2.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-annotations\2.11.2\jackson-annotations-2.11.2.jar;"%REPO%"\com\fasterxml\jackson\core\jackson-core\2.11.2\jackson-core-2.11.2.jar;"%REPO%"\com\fasterxml\jackson\datatype\jackson-datatype-jdk8\2.11.2\jackson-datatype-jdk8-2.11.2.jar;"%REPO%"\com\fasterxml\jackson\datatype\jackson-datatype-jsr310\2.11.2\jackson-datatype-jsr310-2.11.2.jar;"%REPO%"\com\fasterxml\jackson\module\jackson-module-parameter-names\2.11.2\jackson-module-parameter-names-2.11.2.jar;"%REPO%"\org\springframework\boot\spring-boot-starter-tomcat\2.3.4.RELEASE\spring-boot-starter-tomcat-2.3.4.RELEASE.jar;"%REPO%"\org\glassfish\jakarta.el\3.0.3\jakarta.el-3.0.3.jar;"%REPO%"\org\apache\tomcat\embed\tomcat-embed-websocket\8.5.23\tomcat-embed-websocket-8.5.23.jar;"%REPO%"\org\springframework\spring-web\5.2.9.RELEASE\spring-web-5.2.9.RELEASE.jar;"%REPO%"\org\springframework\spring-webmvc\5.2.9.RELEASE\spring-webmvc-5.2.9.RELEASE.jar;"%REPO%"\org\postgresql\postgresql\42.2.19\postgresql-42.2.19.jar;"%REPO%"\org\checkerframework\checker-qual\3.5.0\checker-qual-3.5.0.jar;"%REPO%"\org\springframework\boot\spring-boot-configuration-processor\2.3.4.RELEASE\spring-boot-configuration-processor-2.3.4.RELEASE.jar;"%REPO%"\org\projectlombok\lombok\1.18.12\lombok-1.18.12.jar;"%REPO%"\org\apache\tomcat\embed\tomcat-embed-core\8.5.23\tomcat-embed-core-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-annotations-api\8.5.23\tomcat-annotations-api-8.5.23.jar;"%REPO%"\org\apache\tomcat\embed\tomcat-embed-jasper\8.5.23\tomcat-embed-jasper-8.5.23.jar;"%REPO%"\org\apache\tomcat\embed\tomcat-embed-el\8.5.23\tomcat-embed-el-8.5.23.jar;"%REPO%"\org\eclipse\jdt\ecj\3.12.3\ecj-3.12.3.jar;"%REPO%"\org\apache\tomcat\tomcat-jasper\8.5.23\tomcat-jasper-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-servlet-api\8.5.23\tomcat-servlet-api-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-juli\8.5.23\tomcat-juli-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-el-api\8.5.23\tomcat-el-api-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-api\8.5.23\tomcat-api-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-util-scan\8.5.23\tomcat-util-scan-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-util\8.5.23\tomcat-util-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-jasper-el\8.5.23\tomcat-jasper-el-8.5.23.jar;"%REPO%"\org\apache\tomcat\tomcat-jsp-api\8.5.23\tomcat-jsp-api-8.5.23.jar;"%REPO%"\org\apache\poi\poi\4.1.2\poi-4.1.2.jar;"%REPO%"\commons-codec\commons-codec\1.14\commons-codec-1.14.jar;"%REPO%"\org\apache\commons\commons-collections4\4.4\commons-collections4-4.4.jar;"%REPO%"\org\apache\commons\commons-math3\3.6.1\commons-math3-3.6.1.jar;"%REPO%"\com\zaxxer\SparseBitSet\1.2\SparseBitSet-1.2.jar;"%REPO%"\org\apache\poi\poi-ooxml\4.1.2\poi-ooxml-4.1.2.jar;"%REPO%"\org\apache\poi\poi-ooxml-schemas\4.1.2\poi-ooxml-schemas-4.1.2.jar;"%REPO%"\org\apache\xmlbeans\xmlbeans\3.1.0\xmlbeans-3.1.0.jar;"%REPO%"\org\apache\commons\commons-compress\1.19\commons-compress-1.19.jar;"%REPO%"\com\github\virtuald\curvesapi\1.06\curvesapi-1.06.jar;"%REPO%"\log4j\log4j\1.2.17\log4j-1.2.17.jar;"%REPO%"\com\airnavigation\tradeunion\airnavigation.tradeunion\1.0.0-RELEASE\airnavigation.tradeunion-1.0.0-RELEASE.war

set ENDORSED_DIR=
if NOT "%ENDORSED_DIR%" == "" set CLASSPATH="%BASEDIR%"\%ENDORSED_DIR%\*;%CLASSPATH%

if NOT "%CLASSPATH_PREFIX%" == "" set CLASSPATH=%CLASSPATH_PREFIX%;%CLASSPATH%

@REM Reaching here means variables are defined and arguments have been captured
:endInit

%JAVACMD% %JAVA_OPTS%  -classpath %CLASSPATH% -Dapp.name="airnavigation" -Dapp.repo="%REPO%" -Dapp.home="%BASEDIR%" -Dbasedir="%BASEDIR%" com.airnavigation.tradeunion.AirnavigationTradeunionWebResourceApplication %CMD_LINE_ARGS%
if %ERRORLEVEL% NEQ 0 goto error
goto end

:error
if "%OS%"=="Windows_NT" @endlocal
set ERROR_CODE=%ERRORLEVEL%

:end
@REM set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" goto endNT

@REM For old DOS remove the set variables from ENV - we assume they were not set
@REM before we started - at least we don't leave any baggage around
set CMD_LINE_ARGS=
goto postExec

:endNT
@REM If error code is set to 1 then the endlocal was done already in :error.
if %ERROR_CODE% EQU 0 @endlocal


:postExec

if "%FORCE_EXIT_ON_ERROR%" == "on" (
  if %ERROR_CODE% NEQ 0 exit %ERROR_CODE%
)

exit /B %ERROR_CODE%
