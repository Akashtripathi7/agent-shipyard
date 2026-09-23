// lib/theme/tokens.dart
// Every spacing, radius and motion value the app uses. Colours and text styles live in
// ThemeData; this extension holds the rest. Widgets read tokens, never raw numbers.
import 'package:flutter/material.dart';

@immutable
class AppTokens extends ThemeExtension<AppTokens> {
  const AppTokens({
    this.spaceXs = 4,
    this.spaceS = 8,
    this.spaceM = 16,
    this.spaceL = 24,
    this.radiusS = 8,
    this.radiusM = 12,
    this.motionFast = const Duration(milliseconds: 150),
    this.motionBase = const Duration(milliseconds: 250),
    this.easing = Curves.easeOutCubic,
  });

  final double spaceXs, spaceS, spaceM, spaceL;
  final double radiusS, radiusM;
  final Duration motionFast, motionBase;
  final Curve easing;

  /// Durations collapse to zero when the system asks for reduced motion.
  Duration motion(BuildContext context, Duration d) =>
      MediaQuery.of(context).disableAnimations ? Duration.zero : d;

  @override
  AppTokens copyWith({double? spaceM, double? radiusM, Duration? motionBase}) => AppTokens(
        spaceM: spaceM ?? this.spaceM,
        radiusM: radiusM ?? this.radiusM,
        motionBase: motionBase ?? this.motionBase,
      );

  @override
  AppTokens lerp(ThemeExtension<AppTokens>? other, double t) => this;
}

extension AppTokensX on BuildContext {
  AppTokens get tokens => Theme.of(this).extension<AppTokens>() ?? const AppTokens();
}
